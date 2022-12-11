import { FC, useContext } from "react";
import Link from "next/link";
import Tree from "react-d3-tree";
import { CustomEditor } from "../../CustomEditor";
import {
  convertCustomNodeList,
  convertRawNodeDatum,
} from "../../../features/code/AstUtils";
import { WritingContext } from "../../../features/writing/Provider";
import { MultiEditorContainer, LinkContainer, LinkLabel } from "./index.css";
import { WritingTreeNodeElement } from "./WritingTreeNodeElement";

export const WritingPageContent: FC = () => {
  const [writingState, dispatchWriting] = useContext(WritingContext);

  return (
    <>
      <div className={LinkContainer}>
        <Link href="/writing/analytics" passHref>
          <a className={LinkLabel}>分析ページへ</a>
        </Link>
      </div>
      <div className={MultiEditorContainer}>
        <CustomEditor
          onCodeChange={(code) => {
            const customNodeList = convertCustomNodeList(code);
            if (customNodeList === undefined) {
              return;
            }
            dispatchWriting({ type: "UPDATE_AST", customNodeList });
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
    </>
  );
};
