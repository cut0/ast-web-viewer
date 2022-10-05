import { FC, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "../../features/auth/AuthProvider";
import { logInWithGoogle } from "../../features/auth/AuthUtils";
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
  return (
    <div className={PageContainer}>
      <header className={Header}>
        {authState.status === "login" ? (
          <button className={ProfileImageContainer} type="button">
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
        <Link href="/read" passHref>
          <a className={CardContainer}>
            <h2 className={CardTitle}>Reading</h2>
            <section className={CardSummary}> コードを読むページです</section>
            <span className={CardNav}>Readingページへ</span>
          </a>
        </Link>
        <Link href="/write" passHref>
          <a className={CardContainer}>
            <h2 className={CardTitle}>Writing</h2>
            <section className={CardSummary}>コードを書くページです</section>
            <span className={CardNav}>Writingページへ</span>
          </a>
        </Link>
        <Link href="/experiment" passHref>
          <a className={CardContainer}>
            <h2 className={CardTitle}>Experiment</h2>
            <section className={CardSummary}>
              ASTのライブ変換を確認するページです
            </section>
            <span className={CardNav}>Experimentページへ</span>
          </a>
        </Link>
      </div>
    </div>
  );
};
