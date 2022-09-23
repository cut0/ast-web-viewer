import { FC } from "react";
import Link from "next/link";
import {
  PageContainer,
  CardContainer,
  CardListContainer,
  CardTitle,
  CardSummary,
  CardNav,
} from "./index.css";

export const HomePageContent: FC = () => {
  return (
    <div className={PageContainer}>
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
        <Link href="/explorer" passHref>
          <a className={CardContainer}>
            <h2 className={CardTitle}>Explorer</h2>
            <section className={CardSummary}>
              ASTのライブ変換を確認するページです
            </section>
            <span className={CardNav}>Explorerページへ</span>
          </a>
        </Link>
      </div>
    </div>
  );
};
