import { useState, FC, useContext, useMemo, useEffect } from "react";
import Link from "next/link";
import Tree from "react-d3-tree";
import { CustomViewer } from "../../../components/CustomViewer";
import {
  convertCustomNodeList,
  convertRawNodeDatum,
  CustomNode,
} from "../../../features/code/AstUtils";
import { AuthContext } from "../../../features/auth/AuthProvider";
import { ReadingContext } from "../../../features/reading/Provider";
import { MultiEditorContainer, LinkContainer, LinkLabel } from "./index.css";
import { ReadingTreeNodeElement } from "./ReadingTreeNodeElement";

export const ReadPageContent: FC = () => {
  const [authState] = useContext(AuthContext);
  const [readingState, dispatchReading] = useContext(ReadingContext);

  const [nodeList, setNodeList] = useState<CustomNode[] | undefined>(undefined);

  useEffect(() => {
    const nodeList = convertCustomNodeList(readingState.baseCode);
    setNodeList(nodeList);
  }, [readingState.baseCode]);

  const currentFocusNodePosition = useMemo(() => {
    if (readingState.payload.length < 1) {
      return undefined;
    }
    return readingState.payload.slice(-1)[0].position;
  }, [readingState.payload]);

  return (
    <div className={MultiEditorContainer}>
      <div className={LinkContainer}>
        {authState.status === "login" ? (
          <Link href="/read/analytics" passHref>
            <a className={LinkLabel}>分析ページへ</a>
          </Link>
        ) : (
          <Link href="/" passHref>
            <a className={LinkLabel}>ログインページへ</a>
          </Link>
        )}
      </div>
      <CustomViewer
        code={readingState.baseCode}
        onHover={(position) => {
          dispatchReading({ type: "UPDATE_READ_POINT", position });
        }}
      />
      {nodeList !== undefined && (
        <Tree
          data={convertRawNodeDatum(nodeList)}
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
