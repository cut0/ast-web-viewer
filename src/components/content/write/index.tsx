import { FC, useContext } from "react";
import Link from "next/link";
import Tree from "react-d3-tree";
import { CustomEditor } from "../../../components/CustomEditor";
import {
  convertCustomNodeList,
  convertRawNodeDatum,
} from "../../../features/code/AstUtils";
import { AuthContext } from "../../../features/auth/AuthProvider";
import { WritingContext } from "../../../features/write/Provider";
import { MultiEditorContainer, LinkContainer, LinkLabel } from "./index.css";
import { WritingTreeNodeElement } from "./WritingTreeNodeElement";

export const WritePageContent: FC = () => {
  const [authState] = useContext(AuthContext);
  const [writingState, dispatchWriting] = useContext(WritingContext);

  return (
    <div className={MultiEditorContainer}>
      <div className={LinkContainer}>
        {authState.status === "login" ? (
          <Link href="/write/analytics" passHref>
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
          const customNodeList = convertCustomNodeList(code);
          if (customNodeList === undefined) {
            return;
          }
          dispatchWriting({ type: "UPDATE_AST", customNodeList });
          console.log(writingState);
        }}
      />
      {writingState.payload.length > 0 && (
        <Tree
          data={convertRawNodeDatum(
            writingState.payload.slice(-1)[0].customNodeList,
          )}
          depthFactor={300}
          renderCustomNodeElement={(props) => {
            return <WritingTreeNodeElement {...props} />;
          }}
          separation={{ siblings: 2, nonSiblings: 3 }}
          collapsible
        />
      )}
    </div>
  );
};
