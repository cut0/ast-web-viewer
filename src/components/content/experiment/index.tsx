import { FC, useContext, useMemo } from "react";
import Link from "next/link";
import { CustomEditor } from "../../CustomEditor";
import { CustomViewer } from "../../CustomViewer";
import { convertCustomNodeList } from "../../../features/code/AstUtils";
import { ExperimentContext } from "../../../features/experiment/Provider";
import { AuthContext } from "../../../features/auth/AuthProvider";
import { MultiEditorContainer, LinkContainer, LinkLabel } from "./index.css";

export const ExperimentPageContent: FC = () => {
  const [experimentalCode, dispatch] = useContext(ExperimentContext);
  const [authState] = useContext(AuthContext);

  const nodeListString = useMemo(() => {
    return JSON.stringify(experimentalCode.payload.nodeList, null, 2);
  }, [experimentalCode]);

  return (
    <div className={MultiEditorContainer}>
      <div className={LinkContainer}>
        {authState.status === "login" ? (
          <Link href="/experiment/analytics" passHref>
            <a className={LinkLabel}>分析ページへ</a>
          </Link>
        ) : (
          <Link href="/" passHref>
            <a className={LinkLabel}>ログインページへ</a>
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
