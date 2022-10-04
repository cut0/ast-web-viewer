import { FC } from "react";
import ReactModal from "react-modal";
import { background } from "../../features/styles/theme";
import {
  ButtonListContainer,
  AcceptButton,
  CancelButton,
} from "./ConfirmModalContainer.css";

type ConfirmModalContainerProps = {
  onClickAccept: () => void;
  onClickCancel: () => void;
} & ReactModal.Props;

export const ConfirmModalContainer: FC<ConfirmModalContainerProps> = ({
  children,
  onClickAccept,
  onClickCancel,
  ...dialogProps
}) => {
  return (
    <ReactModal
      {...dialogProps}
      ariaHideApp={false}
      style={{
        overlay: {
          background: "rgba(0, 0, 0, 0.62)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          border: "none",
          borderRadius: "20px",
          padding: "32px",
          overflow: "visible",
          background: background.default,
        },
      }}
    >
      {children}
      <div className={ButtonListContainer}>
        <button className={AcceptButton} type="button" onClick={onClickAccept}>
          はい
        </button>
        <button className={CancelButton} type="button" onClick={onClickCancel}>
          いいえ
        </button>
      </div>
    </ReactModal>
  );
};
