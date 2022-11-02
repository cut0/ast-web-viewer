import { FC, useContext, useMemo } from "react";
import Link from "next/link";
import Tree from "react-d3-tree";
import { CustomViewer } from "../../CustomViewer";
import {
  convertCustomNodeList,
  convertRawNodeDatum,
  getCustomNodeFromPostion,
} from "../../../features/code/AstUtils";
import { ReadingContext } from "../../../features/reading/Provider";
import { MultiEditorContainer, LinkContainer, LinkLabel } from "./index.css";
import { ReadingTreeNodeElement } from "./ReadingTreeNodeElement";

export const ReadingPageContent: FC = () => {
  const [readingState, dispatchReading] = useContext(ReadingContext);

  const customNodeList = useMemo(() => {
    return convertCustomNodeList(readingState.baseCode);
  }, [readingState.baseCode]);

  const currentFocusNodePosition = useMemo(() => {
    if (readingState.payload.length < 1) {
      return undefined;
    }
    return readingState.payload.slice(-1)[0].customNode.postition;
  }, [readingState.payload]);

  return (
    <div className={MultiEditorContainer}>
      <div className={LinkContainer}>
        <Link href="/reading/analytics" passHref>
          <a className={LinkLabel}>分析ページへ</a>
        </Link>
      </div>
      <CustomViewer
        code={readingState.baseCode}
        onHover={(position) => {
          /**
           * id 取り出し
           */
          if (customNodeList === undefined) {
            return;
          }
          const customNode = getCustomNodeFromPostion(customNodeList, position);
          if (customNode === undefined) {
            return;
          }
          dispatchReading({
            type: "UPDATE_FOCUS_NODE",
            customNode,
          });
        }}
      />
      {customNodeList !== undefined && (
        <Tree
          data={convertRawNodeDatum(customNodeList)}
          depthFactor={300}
          renderCustomNodeElement={(props) => {
            return (
              <ReadingTreeNodeElement
                {...props}
                currentPosition={currentFocusNodePosition}
              />
            );
          }}
          separation={{ siblings: 2, nonSiblings: 3 }}
          collapsible
        />
      )}
    </div>
  );
};
