import { FC, useEffect, useState } from "react";
import { text } from "../../features/styles/theme";
import { CloseSvgIcon } from "../icons/CloseSvgIcon";
import {
  CloseButton,
  ErrorToast,
  Label,
  SuccessToast,
} from "./DropDownToast.css";

type DropDownToastProps = {
  status: "success" | "error";
  message?: string;
};

export const DropDownToast: FC<DropDownToastProps> = ({ status, message }) => {
  const [showDialog, setShowDialog] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowDialog(false);
    }, 1500);
    return () => clearTimeout(timerId);
  }, []);

  if (showDialog === false) {
    return null;
  }

  return (
    <div className={status === "success" ? SuccessToast : ErrorToast}>
      <p className={Label}>{message}</p>
      <button
        className={CloseButton}
        onClick={() => {
          setShowDialog(false);
        }}
      >
        <CloseSvgIcon
          color={status === "success" ? text.default : text.highLight}
          title="close"
        />
      </button>
    </div>
  );
};
