import { DropDownToast } from "../../components/common/DropDownToast";
import { FullScreenLoader } from "../../components/common/FullScreenLoader";

type useHandleApiProps = {
  status: "initial" | "loading" | "success" | "failed";
  successMessage?: string;
  errorMessage?: string;
};

export const useHandleApi = (state: useHandleApiProps) => {
  if (state.status === "loading") {
    return <FullScreenLoader />;
  }
  if (state.status === "success") {
    return <DropDownToast message={state.successMessage} status="success" />;
  }

  if (state.status === "failed") {
    return <DropDownToast message={state.errorMessage} status="error" />;
  }
  return null;
};
