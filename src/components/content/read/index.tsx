import { useState, FC } from "react";
import Link from "next/link";
import { CustomEditor } from "../../../components/CustomEditor";
import { CustomViewer } from "../../../components/CustomViewer";
import { convertAstString } from "../../../features/code/AstUtils";
import {
  MultiEditorContainer,
  AnalyticsLinkContainer,
  AnalyticsLink,
} from "./index.css";

export const ReadPageContent: FC = () => {
  const [astString, setAstString] = useState("");

  return (
    <div className={MultiEditorContainer}>
      <div className={AnalyticsLinkContainer}>
        <Link href="/read/analytics">
          <button className={AnalyticsLink}>Analytics へ</button>
        </Link>
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
