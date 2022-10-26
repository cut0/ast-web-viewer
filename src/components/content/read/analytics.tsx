import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Tree from "react-d3-tree";
import Image from "next/image";
import Link from "next/link";
import { ConfirmModalContainer } from "../../common/ConfirmModalContainer";
import { AuthContext } from "../../../features/auth/AuthProvider";
import { logOutOfGoogle } from "../../../features/auth/AuthUtils";
import { useUploadAnalytics } from "../../../features/code/UploadAnalyticsHooks";
import { useHandleApi } from "../../../features/common/ApiHooks";
import {
  convertCustomNodeList,
  convertRawNodeDatum,
} from "../../../features/code/AstUtils";
import { ReadingContext } from "../../../features/reading/Provider";
import { CustomNode } from "../../../features/code/AstUtils";
import { useInterval } from "../../../features/common/IntervalHooks";
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
import { ReadingTreeNodeElement } from "./ReadingTreeNodeElement";

export const ReadAnalyticsPageContent: FC = () => {
  const [readingState] = useContext(ReadingContext);
  const [nodeList, setNodeList] = useState<CustomNode[] | undefined>(undefined);

  const [isPlay, setIsPlay] = useState(false);
  const [currentFocusNodePosition, setCurrentFocusNodePosition] = useState<
    | {
        start: {
          line: number;
          column: number;
        };
        end: {
          line: number;
          column: number;
        };
      }
    | undefined
  >(undefined);

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

  useEffect(() => {
    const nodeList = convertCustomNodeList(readingState.baseCode);
    setNodeList(nodeList);
  }, [readingState.baseCode]);

  const switchPlaying = useCallback(() => {
    setIsPlay((prev) => {
      return !prev;
    });
  }, []);

  let arrayPosRef = useRef(0);
  useInterval(() => {
    if (
      arrayPosRef.current === readingState.payload.length - 1 ||
      readingState.payload.length === 0
    ) {
      arrayPosRef.current = 0;
      setIsPlay(false);
      return;
    }
    if (!isPlay) {
      return;
    }
    const target = readingState.payload[arrayPosRef.current].position;
    setCurrentFocusNodePosition(target);
    arrayPosRef.current += 1;
  });

  return (
    <>
      <div className={PageContainer}>
        <header className={Header}>
          {authState.status === "login" && (
            <>
              <div>
                <button
                  className={isPlay ? PlayingButton : StoppingButton}
                  type="button"
                  onClick={switchPlaying}
                >
                  {isPlay ? "再生中" : "停止中"}
                </button>
              </div>
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
                      authState.payload.photoURL?.replace(
                        "=s96-c",
                        "=s200-c",
                      ) ?? ""
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
            </>
          )}
          {authState.status !== "login" && (
            <Link href="/" passHref>
              <a className={LinkLabel}> ログインページへ</a>
            </Link>
          )}
        </header>
        <div className={TreeViewerContainer}>
          {nodeList !== undefined && (
            <Tree
              data={convertRawNodeDatum(nodeList)}
              depthFactor={300}
              renderCustomNodeElement={(props) => {
                return (
                  <ReadingTreeNodeElement
                    {...props}
                    currentPosition={currentFocusNodePosition}
                  />
                );
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
            JSON.stringify(readingState),
            "reading",
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
