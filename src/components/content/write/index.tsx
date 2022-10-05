import { useState, FC, useContext } from "react";
import Link from "next/link";
import { CustomEditor } from "../../../components/CustomEditor";
import { CustomViewer } from "../../../components/CustomViewer";
import { convertCustomNodeList } from "../../../features/code/AstUtils";
import { AuthContext } from "../../../features/auth/AuthProvider";
import {
  MultiEditorContainer,
  AnalyticsLinkContainer,
  AnalyticsLink,
} from "./index.css";

export const WritePageContent: FC = () => {
  const [astString, setAstString] = useState("");
  const [authState] = useContext(AuthContext);

  return (
    <div className={MultiEditorContainer}>
      <div className={AnalyticsLinkContainer}>
        {authState.status === "login" ? (
          <Link href="/write/analytics" passHref>
            <a className={AnalyticsLink}>分析ページへ</a>
          </Link>
        ) : (
          <Link href="/" passHref>
            <a className={AnalyticsLink}>ログインページへ</a>
          </Link>
        )}
      </div>
      <CustomEditor
        onCodeChange={(code) => {
          convertCustomNodeList(code).then((ast) => {
            if (ast === undefined) {
              setAstString("");
              return;
            }
            setAstString(JSON.stringify(ast, null, 2));
          });
        }}
      />
      <CustomViewer code={astString} />
    </div>
  );
};
