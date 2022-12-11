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
import {
  convertRawNodeDatum,
  fetchAverageDepth,
  fetchAverageStrahlerNumber,
  fetchNodeCount,
} from "../../features/code/AstUtils";
import { useInterval } from "../../features/common/IntervalHooks";
import { WritingContext } from "../../features/writing/Provider";
import { WritingTreeNodeElement } from "../../components/writing/WritingTreeNodeElement";
import { AstInfoGraph } from "../../components/writing/AstInfoGraph";
import { CustomViewer } from "../../components/writing/CustomViewer";
import {
  MainContainer,
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
  InfoContainer,
} from "./analytics.css";

export const WritingAnalyticsPageContent: FC = () => {
  const [writingState] = useContext(WritingContext);
  console.log(JSON.stringify(writingState));

  const [authState] = useContext(AuthContext);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const [showLogOutConfirmModal, setShowLogOutConfirmModal] = useState(false);

  const [payloadStep, setPayloadStep] = useState(0);
  const [isPlay, setIsPlay] = useState(false);

  const userIdRef = useRef<HTMLInputElement>(null);

  const [uploadState, uploadHandler] = useUploadAnalytics();
  const ToastComponent = useHandleApi({
    status: uploadState.status,
    successMessage: "アップロード完了",
    errorMessage: "アップロード失敗",
  });

  const totalStep = useMemo(() => {
    return writingState.payload.length;
  }, [writingState.payload]);

  const currentPayload = useMemo(() => {
    return totalStep === 0 ? undefined : writingState.payload[payloadStep];
  }, [totalStep, writingState.payload, payloadStep]);

  const timeSeriesParams = useMemo(() => {
    return writingState.payload.slice(0, payloadStep).map((el) => {
      const nodeCount = fetchNodeCount(el.customNodeList);
      const averageStrahlerNumber = fetchAverageStrahlerNumber(
        el.customNodeList,
      );
      const averageDepth = fetchAverageDepth(el.customNodeList);
      return { nodeCount, averageStrahlerNumber, averageDepth };
    });
  }, [writingState.payload, payloadStep]);

  useInterval(() => {
    if (payloadStep === totalStep - 1 || totalStep === 0) {
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
      if (prev === false && payloadStep === totalStep - 1) {
        setPayloadStep(0);
      }
      return !prev;
    });
  }, [payloadStep, totalStep]);

  const router = useRouter();
  useEffect(() => {
    if (totalStep === 0) {
      router.push("/writing");
    }
  }, [totalStep, router]);

  return (
    <>
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
                  authState.payload.photoURL?.replace("=s96-c", "=s200-c") ?? ""
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
      <main className={MainContainer}>
        {currentPayload && (
          <>
            <CustomViewer code={currentPayload.rawProgram} />
            <div className={InfoContainer}>
              <AstInfoGraph timeSeriesParams={timeSeriesParams} />
              <Tree
                data={convertRawNodeDatum(currentPayload.customNodeList)}
                depthFactor={300}
                renderCustomNodeElement={(props) => {
                  return <WritingTreeNodeElement {...props} />;
                }}
                separation={{ siblings: 2, nonSiblings: 3 }}
                collapsible
              />
            </div>
          </>
        )}
      </main>

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
