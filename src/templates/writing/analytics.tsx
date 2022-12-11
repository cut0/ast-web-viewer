import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Tree from "react-d3-tree";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
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

  const [payloadStep, setPayloadStep] = useState(0);
  useInterval(() => {
    if (
      payloadStep === writingState.payload.length - 1 ||
      writingState.payload.length === 0
    ) {
      setIsPlay(false);
      return;
    }
    if (!isPlay) {
      return;
    }
    setPayloadStep((pre) => pre + 1);
  });

  const switchPlaying = useCallback(() => {
    setIsPlay((prev) => {
      if (prev === false && payloadStep === writingState.payload.length - 1) {
        setPayloadStep(0);
      }
      return !prev;
    });
  }, [payloadStep, writingState.payload.length]);

  const router = useRouter();
  useEffect(() => {
    if (writingState.payload.length === 0) {
      router.push("/writing");
    }
  }, [writingState.payload, router]);

  const currentCustomNodeList = useMemo(() => {
    return writingState.payload[payloadStep].customNodeList;
  }, [writingState.payload, payloadStep]);

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
              {isPlay
                ? `再生中 ${payloadStep + 1}/${writingState.payload.length}`
                : `停止中 ${payloadStep + 1}/${writingState.payload.length}`}
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
              data={convertRawNodeDatum(currentCustomNodeList)}
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
