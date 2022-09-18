import { FC } from "react";
import {
  PageContainer,
  CardContainer,
  CardListContainer,
  CardTitle,
  CardSummary,
  CardNav,
} from "./index.css";
import { Link } from "react-router-dom";

const TopPage: FC = () => {
  return (
    <div className={PageContainer}>
      <div className={CardListContainer}>
        <Link className={CardContainer} to="/read">
          <h2 className={CardTitle}>Reading</h2>
          <section className={CardSummary}> コードを読むページです</section>
          <span className={CardNav}>Readingページへ</span>
        </Link>
        <Link className={CardContainer} to="/write">
          <h2 className={CardTitle}>Writing</h2>
          <section className={CardSummary}>コードを書くページです</section>
          <span className={CardNav}>Writingページへ</span>
        </Link>
        <Link className={CardContainer} to="/explorer">
          <h2 className={CardTitle}>Explorer</h2>
          <section className={CardSummary}>
            ASTのライブ変換を確認するページです
          </section>
          <span className={CardNav}>Explorerページへ</span>
        </Link>
      </div>
    </div>
  );
};

export default TopPage;
