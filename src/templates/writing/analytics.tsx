import { FC, useCallback, useContext, useRef, useState } from "react";
import Tree from "react-d3-tree";
import Image from "next/image";
import Link from "next/link";
import { ConfirmModalContainer } from "../../components/common/ConfirmModalContainer";
import { AuthContext } from "../../features/auth/AuthProvider";
import { logOutOfGoogle } from "../../features/auth/AuthUtils";
import { useUploadAnalytics } from "../../features/code/UploadAnalyticsHooks";
import { useHandleApi } from "../../features/common/ApiHooks";
import { convertRawNodeDatum } from "../../features/code/AstUtils";
import { useInterval } from "../../features/common/IntervalHooks";
import { WritingContext } from "../../features/writing/Provider";
import { WritingTreeNodeElement } from "../../components/writing/WritingTreeNodeElement";
import {
  PageContainer,
  TreeViewerContainer,
  Header,
  ProfileImage,
  ProfileImageContainer,
  SubmitCodeButton,
  UserInputContainer,
  UserInputLabel,
  LinkLabel,
  UploadContainer,
  PlayingButton,
  StoppingButton,
} from "./analytics.css";

export const WritingAnalyticsPageContent: FC = () => {
  const [writingState] = useContext(WritingContext);
  const [isPlay, setIsPlay] = useState(false);

  const [authState] = useContext(AuthContext);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const [showLogOutConfirmModal, setShowLogOutConfirmModal] = useState(false);

  const userIdRef = useRef<HTMLInputElement>(null);

  const [uploadState, uploadHandler] = useUploadAnalytics();
  const ToastComponent = useHandleApi({
    status: uploadState.status,
    successMessage: "アップロード完了",
    errorMessage: "アップロード失敗",
  });

  const switchPlaying = useCallback(() => {
    setIsPlay((prev) => {
      return !prev;
    });
  }, []);

  const [payloadPos, setPayloadPost] = useState(0);
  useInterval(() => {
    if (
      payloadPos === writingState.payload.length - 1 ||
      writingState.payload.length === 0
    ) {
      setPayloadPost(0);
      setIsPlay(false);
      return;
    }
    if (!isPlay) {
      return;
    }
    setPayloadPost((pre) => pre + 1);
  });

  return (
    <>
      <div className={PageContainer}>
        <header className={Header}>
          <div>
            <button
              className={isPlay ? PlayingButton : StoppingButton}
              type="button"
              onClick={switchPlaying}
            >
              {isPlay ? "再生中" : "停止中"}
            </button>
          </div>
          {authState.status === "login" && (
            <div className={UploadContainer}>
              <button
                className={ProfileImageContainer}
                type="button"
                onClick={() => {
                  setShowLogOutConfirmModal(true);
                }}
              >
                <Image
                  alt="profile-icon"
                  className={ProfileImage}
                  layout="fill"
                  src={
                    authState.payload.photoURL?.replace("=s96-c", "=s200-c") ??
                    ""
                  }
                ></Image>
              </button>
              <button
                className={SubmitCodeButton}
                type="button"
                onClick={() => {
                  setShowSubmitConfirmModal(true);
                }}
              >
                登録
              </button>
            </div>
          )}
          {authState.status !== "login" && (
            <Link href="/" passHref>
              <a className={LinkLabel}> ログインページへ</a>
            </Link>
          )}
        </header>
        <div className={TreeViewerContainer}>
          {writingState.payload.length > 0 && (
            <Tree
              data={convertRawNodeDatum(
                writingState.payload[payloadPos].customNodeList,
              )}
              depthFactor={300}
              renderCustomNodeElement={(props) => {
                return <WritingTreeNodeElement {...props} />;
              }}
              separation={{ siblings: 2, nonSiblings: 3 }}
              collapsible
            />
          )}
        </div>
      </div>
      <ConfirmModalContainer
        isOpen={showSubmitConfirmModal}
        onClickAccept={() => {
          if (userIdRef.current === null) {
            return;
          }
          uploadHandler(
            JSON.stringify(writingState),
            "writing",
            userIdRef.current.value,
          );
          setShowSubmitConfirmModal(false);
        }}
        onClickCancel={() => {
          setShowSubmitConfirmModal(false);
        }}
      >
        <p>ログを登録しますか？</p>
        <div className={UserInputContainer}>
          <label className={UserInputLabel}>User ID</label>
          <input ref={userIdRef} />
        </div>
      </ConfirmModalContainer>
      <ConfirmModalContainer
        isOpen={showLogOutConfirmModal}
        onClickAccept={() => {
          logOutOfGoogle();
          setShowLogOutConfirmModal(false);
        }}
        onClickCancel={() => {
          setShowLogOutConfirmModal(false);
        }}
      >
        <p>ログアウトしますか？</p>
      </ConfirmModalContainer>
      {ToastComponent}
    </>
  );
};
