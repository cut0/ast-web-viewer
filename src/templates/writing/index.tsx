import { FC, useCallback, useContext, useMemo } from "react";
import Link from "next/link";
import Tree from "react-d3-tree";
import { CustomEditor } from "../../components/writing/CustomEditor";
import {
  convertCustomNodeList,
  convertRawNodeDatum,
  fetchAverageDepth,
  fetchAverageStrahlerNumber,
  fetchNodeCount,
} from "../../features/code/AstUtils";
import { WritingContext } from "../../features/writing/Provider";
import { WritingTreeNodeElement } from "../../components/writing/WritingTreeNodeElement";
import { AstInfoPanel } from "../../components/writing/AstInfoPanel";
import { MultiEditorContainer, LinkContainer, LinkLabel } from "./index.css";

export const WritingPageContent: FC = () => {
  const [writingState, dispatchWriting] = useContext(WritingContext);

  const currentCustomNodeList = useMemo(() => {
    return writingState.payload.length > 0
      ? writingState.payload.slice(-1)[0].customNodeList
      : [];
  }, [writingState]);

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
            data={convertRawNodeDatum(currentCustomNodeList)}
            depthFactor={300}
            renderCustomNodeElement={(props) => {
              return <WritingTreeNodeElement {...props} />;
            }}
            separation={{ siblings: 2, nonSiblings: 3 }}
            collapsible
          />
        )}
      </div>
      <AstInfoPanel
        averageDepth={fetchAverageDepth(currentCustomNodeList)}
        averageStrahlerNumber={fetchAverageStrahlerNumber(
          currentCustomNodeList,
        )}
        nodeCount={fetchNodeCount(currentCustomNodeList)}
      />
    </>
  );
};
