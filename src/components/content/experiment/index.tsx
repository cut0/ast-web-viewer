import { FC, useContext, useMemo } from "react";
import Link from "next/link";
import { CustomEditor } from "../../CustomEditor";
import { CustomViewer } from "../../CustomViewer";
import { convertCustomTree } from "../../../features/code/AstUtils";
import { ExperimentCodeContext } from "../../../features/experiment/CodeProvider";
import {
  MultiEditorContainer,
  AnalyticsLinkContainer,
  AnalyticsLink,
} from "./index.css";

export const ExperimentPageContent: FC = () => {
  const [nodeList, dispatch] = useContext(ExperimentCodeContext);

  const nodeListString = useMemo(() => {
    return JSON.stringify(nodeList.payload, null, 2);
  }, [nodeList]);

  return (
    <div className={MultiEditorContainer}>
      <div className={AnalyticsLinkContainer}>
        <Link href="/experiment/analytics">
          <button className={AnalyticsLink}>Analytics へ</button>
        </Link>
      </div>
      <CustomEditor
        onCodeChange={(code) => {
          convertCustomTree(code).then((nodeList) => {
            if (nodeList === undefined) {
              dispatch({ type: "RESET_NODE_LIST" });
              return;
            }
            dispatch({ type: "UPDATE_NODE_LIST", nodeList });
          });
        }}
      />
      <CustomViewer code={nodeListString} />
    </div>
  );
};
