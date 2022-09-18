import {
  MultiEditorContainer,
  AnalyticsLinkContainer,
  AnalyticsLink,
} from "./index.css";
import { CustomEditor } from "../../components/CustomEditor";
import { CustomViewer } from "../../components/CustomViewer";
import { useState, FC } from "react";
import { convertAstString } from "../../features/code/AstUtils";
import { Link } from "react-router-dom";

const WritePage: FC = () => {
  const [astString, setAstString] = useState("");

  return (
    <div className={MultiEditorContainer}>
      <div className={AnalyticsLinkContainer}>
        <Link to="/write/analytics">
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

export default WritePage;
