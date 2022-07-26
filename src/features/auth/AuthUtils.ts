import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { handleApiError } from "../common/ApiUtils";

export const logInWithGoogle = async (errorCallback?: () => void) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const response = await signInWithPopup(auth, provider).catch(handleApiError);
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
