import { useCallback, useContext, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../auth/AuthProvider";
import { handleApiError } from "../common/ApiUtils";

type BucketType = "reading" | "writing";

const uploadJson = async (
  content: string,
  bucketType: BucketType,
  createUserId: string,
  userId: string,
) => {
  const storage = getStorage();
  const storageRef = ref(
    storage,
    `/${createUserId}/${bucketType}/${userId}/${Math.random()
      .toString(32)
      .substring(2)}.json`,
  );
  return await uploadString(storageRef, content);
};

type UploadState =
  | { status: "initial" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "failed"; error: Error };

export const useUploadAnalytics = () => {
  const [authState] = useContext(AuthContext);
  const [uploadState, setUploadState] = useState<UploadState>({
    status: "initial",
  });

  const handler = useCallback(
    async (content: string, bucketType: BucketType, userId: string) => {
      if (authState.status !== "login") {
        return;
      }
      setUploadState({ status: "loading" });

      const uploadJsonResponse = await uploadJson(
        content,
        bucketType,
        authState.payload.uid,
        userId,
      ).catch(handleApiError);
      if (uploadJsonResponse instanceof Error) {
        setUploadState({ status: "failed", error: uploadJsonResponse });
        return;
      }

      const jsonDownloadUrlResponse = await getDownloadURL(
        uploadJsonResponse.ref,
      ).catch(handleApiError);
      if (jsonDownloadUrlResponse instanceof Error) {
        setUploadState({ status: "failed", error: jsonDownloadUrlResponse });
        return;
      }

      const db = getFirestore();
      const docRefResponse = await addDoc(collection(db, bucketType), {
        userId,
        createUserId: authState.payload.uid,
        url: jsonDownloadUrlResponse,
      }).catch(handleApiError);
      if (docRefResponse instanceof Error) {
        setUploadState({ status: "failed", error: docRefResponse });
        return;
      }

      setUploadState({ status: "success" });
    },
    [authState],
  );

  return [uploadState, handler] as const;
};
