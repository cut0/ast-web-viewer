import { useState, FC, useContext } from "react";
import Link from "next/link";
import { CustomEditor } from "../../../components/CustomEditor";
import { CustomViewer } from "../../../components/CustomViewer";
import { convertAstString } from "../../../features/code/AstUtils";
import { AuthContext } from "../../../features/auth/AuthProvider";
import { MultiEditorContainer, LinkContainer, LinkLabel } from "./index.css";

export const ReadPageContent: FC = () => {
  const [astString, setAstString] = useState("");
  const [authState] = useContext(AuthContext);

  return (
    <div className={MultiEditorContainer}>
      <div className={LinkContainer}>
        {authState.status === "login" ? (
          <Link href="/read/analytics" passHref>
            <a className={LinkLabel}>分析ページへ</a>
          </Link>
        ) : (
          <Link href="/" passHref>
            <a className={LinkLabel}>ログインページへ</a>
          </Link>
        )}
      </div>
      <CustomEditor
        onCodeChange={(code) => {
          convertAstString(code).then((ast) => {
            if (ast === undefined) {
              return;
            }
            setAstString(ast);
          });
        }}
      />
      <CustomViewer code={astString} />
    </div>
  );
};
