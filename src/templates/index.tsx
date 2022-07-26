import { FC, useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "../features/auth/AuthProvider";
import { logInWithGoogle } from "../features/auth/AuthUtils";
import { ConfirmModalContainer } from "../components/common/ConfirmModalContainer";
import { logOutOfGoogle } from "../features/auth/AuthUtils";
import {
  PageContainer,
  Header,
  ProfileImageContainer,
  ProfileImage,
  CardContainer,
  CardListContainer,
  CardTitle,
  CardSummary,
  CardNav,
} from "./index.css";

export const HomePageContent: FC = () => {
  const [authState] = useContext(AuthContext);
  const [showLogOutConfirmModal, setShowLogOutConfirmModal] = useState(false);

  return (
    <>
      <div className={PageContainer}>
        <header className={Header}>
          {authState.status === "login" ? (
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
              />
            </button>
          ) : (
            <button
              className={ProfileImageContainer}
              type="button"
              onClick={() => {
                logInWithGoogle();
              }}
            />
          )}
        </header>
        <div className={CardListContainer}>
          <Link href="/writing" passHref>
            <a className={CardContainer}>
              <h2 className={CardTitle}>Writing</h2>
              <section className={CardSummary}>コードを写すページです</section>
              <span className={CardNav}>写すページへ</span>
            </a>
          </Link>
          <Link href="/writing/self" passHref>
            <a className={CardContainer}>
              <h2 className={CardTitle}>Writing</h2>
              <section className={CardSummary}>コードを書くページです</section>
              <span className={CardNav}>書くページへ</span>
            </a>
          </Link>
        </div>
      </div>
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
    </>
  );
};
