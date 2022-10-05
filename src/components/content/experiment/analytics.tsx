import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { ExperimentCodeContext } from "../../../features/experiment/CodeProvider";
import { ConfirmModalContainer } from "../../common/ConfirmModalContainer";
import { AuthContext } from "../../../features/auth/AuthProvider";
import { logOutOfGoogle } from "../../../features/auth/AuthUtils";
import { useUploadAnalytics } from "../../../features/code/UploadAnalyticsHooks";
import { useHandleApi } from "../../../features/common/ApiHooks";
import { convertRawNodeDatum } from "../../../features/code/AstUtils";
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
} from "./analytics.css";

export const ExperimentAnalyticsPageContent: FC = () => {
  const [experimentalCode] = useContext(ExperimentCodeContext);
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

  const rawNodeDatum: RawNodeDatum | undefined = useMemo(() => {
    return convertRawNodeDatum(experimentalCode.payload.nodeList);
  }, [experimentalCode]);

  const router = useRouter();
  useEffect(() => {
    if (rawNodeDatum === undefined) {
      router.push("/experiment");
    }
  }, [rawNodeDatum, router]);

  if (rawNodeDatum === undefined) {
    return null;
  }

  return (
    <>
      <div className={PageContainer}>
        <header className={Header}>
          {authState.status === "login" && (
            <>
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
            </>
          )}
          {authState.status !== "login" && (
            <Link href="/" passHref>
              <a className={LinkLabel}> ログインページへ</a>
            </Link>
          )}
        </header>
        <div className={TreeViewerContainer}>
          <Tree data={rawNodeDatum} />
        </div>
      </div>
      <ConfirmModalContainer
        isOpen={showSubmitConfirmModal}
        onClickAccept={() => {
          if (userIdRef.current === null) {
            return;
          }
          uploadHandler(
            JSON.stringify({
              rawNodeDatum,
              baseCode: experimentalCode.payload.baseCode,
            }),
            "experiment",
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
