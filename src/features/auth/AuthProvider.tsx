import { User } from "firebase/auth";
import {
  ReactNode,
  createContext,
  FC,
  Reducer,
  useReducer,
  useEffect,
} from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useHandleApi } from "../common/ApiHooks";

type Action =
  | { type: "FETCH_ME_SUCCESS"; payload: User }
  | { type: "REMOVE_ME" };

type State =
  | { status: "initial" }
  | { status: "login"; payload: User }
  | { status: "logout" };

export const authInitialState: State = { status: "initial" };

export const authReducer: Reducer<State, Action> = (
  state: State,
  action: Action,
) => {
  switch (action.type) {
    case "FETCH_ME_SUCCESS":
      return {
        ...state,
        status: "login",
        payload: action.payload,
      };
    case "REMOVE_ME":
      return {
        ...state,
        status: "logout",
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<[State, (action: Action) => void]>([
  authInitialState,
  () => {},
]);

export const AuthContextContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const LogInToastComponent = useHandleApi({
    status: state.status === "login" ? "success" : "initial",
    successMessage: "ログインしました",
  });
  const LogOutToastComponent = useHandleApi({
    status: state.status === "logout" ? "success" : "initial",
    successMessage: "ログアウトしました",
  });
  initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user === null) {
        dispatch({ type: "REMOVE_ME" });
        return;
      }
      dispatch({
        type: "FETCH_ME_SUCCESS",
        payload: user,
      });
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
      {LogInToastComponent}
      {LogOutToastComponent}
    </AuthContext.Provider>
  );
};
