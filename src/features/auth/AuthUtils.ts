import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { handleApiError } from "../common/ApiUtils";

export const signInWithGoogle = async (errorCallback?: () => void) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const response = await signInWithRedirect(auth, provider).catch(
    handleApiError,
  );
  if (response instanceof Error) {
    errorCallback && errorCallback();
    throw Error("failed");
  }
  return;
};

export const signOutOfGoogle = async (errorCallback?: () => void) => {
  const auth = getAuth();
  const response = await signOut(auth).catch(handleApiError);
  if (response instanceof Error) {
    errorCallback && errorCallback();
    throw Error("failed");
  }
  return;
};
