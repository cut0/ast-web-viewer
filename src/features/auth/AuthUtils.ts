import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  signInWithRedirect,
} from "firebase/auth";
import { handleApiError } from "../common/ApiUtils";

export const logInWithGoogle = async (errorCallback?: () => void) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const response = await signInWithRedirect(auth, provider).catch(
    handleApiError,
  );
  if (response instanceof Error) {
    errorCallback && errorCallback();
    return Error("failed");
  }
  return;
};

export const logOutOfGoogle = async (errorCallback?: () => void) => {
  const auth = getAuth();
  const response = await signOut(auth).catch(handleApiError);
  if (response instanceof Error) {
    errorCallback && errorCallback();
    return Error("failed");
  }
  return;
};
