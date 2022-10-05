import { FC, useContext, useMemo } from "react";
import Link from "next/link";
import { CustomEditor } from "../../CustomEditor";
import { CustomViewer } from "../../CustomViewer";
import { convertCustomNodeList } from "../../../features/code/AstUtils";
import { ExperimentCodeContext } from "../../../features/experiment/CodeProvider";
import { AuthContext } from "../../../features/auth/AuthProvider";
import {
  MultiEditorContainer,
  AnalyticsLinkContainer,
  AnalyticsLink,
} from "./index.css";

export const ExperimentPageContent: FC = () => {
  const [experimentalCode, dispatch] = useContext(ExperimentCodeContext);
  const [authState] = useContext(AuthContext);

  const nodeListString = useMemo(() => {
    return JSON.stringify(experimentalCode.payload.nodeList, null, 2);
  }, [experimentalCode]);

  return (
    <div className={MultiEditorContainer}>
      <div className={AnalyticsLinkContainer}>
        {authState.status === "login" ? (
          <Link href="/experiment/analytics" passHref>
            <a className={AnalyticsLink}>分析ページへ</a>
          </Link>
        ) : (
          <Link href="/" passHref>
            <a className={AnalyticsLink}>ログインページへ</a>
          </Link>
        )}
      </div>
      <CustomEditor
        defaultValue={experimentalCode.payload.baseCode}
        onCodeChange={(baseCode) => {
          convertCustomNodeList(baseCode).then((nodeList) => {
            if (nodeList === undefined) {
              dispatch({ type: "RESET_NODE_LIST" });
              return;
            }
            dispatch({ type: "UPDATE_NODE_LIST", nodeList, baseCode });
          });
        }}
      />
      <CustomViewer code={nodeListString} />
    </div>
  );
};
