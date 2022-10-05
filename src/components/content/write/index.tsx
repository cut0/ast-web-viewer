import { useState, FC } from "react";
import Link from "next/link";
import { CustomEditor } from "../../../components/CustomEditor";
import { CustomViewer } from "../../../components/CustomViewer";
import { convertCustomNodeList } from "../../../features/code/AstUtils";
import {
  MultiEditorContainer,
  AnalyticsLinkContainer,
  AnalyticsLink,
} from "./index.css";

export const WritePageContent: FC = () => {
  const [astString, setAstString] = useState("");

  return (
    <div className={MultiEditorContainer}>
      <div className={AnalyticsLinkContainer}>
        <Link href="/write/analytics">
          <button className={AnalyticsLink}>Analytics へ</button>
        </Link>
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
