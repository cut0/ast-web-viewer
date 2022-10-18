import { useState, FC, useContext, useMemo, useEffect } from "react";
import Link from "next/link";
import Tree from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { CustomViewer } from "../../../components/CustomViewer";
import {
  convertCustomNodeList,
  convertRawNodeDatum,
  CustomNode,
} from "../../../features/code/AstUtils";
import { AuthContext } from "../../../features/auth/AuthProvider";
import { ReadingContext } from "../../../features/reading/Provider";
import { MultiEditorContainer, LinkContainer, LinkLabel } from "./index.css";

type CustomNodeElementProps = {
  nodeDatum: RawNodeDatum;
  currentPosition?: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  };
};

const CustomNodeElement: FC<CustomNodeElementProps> = ({
  nodeDatum,
  currentPosition,
}) => {
  const isFullFocused = useMemo(() => {
    if (currentPosition === undefined) {
      return false;
    }
    return (
      nodeDatum.attributes?.startLine === String(currentPosition.start.line) &&
      nodeDatum.attributes?.startColumn ===
        String(currentPosition.start.column) &&
      nodeDatum.attributes?.endLine === String(currentPosition.end.line) &&
      nodeDatum.attributes?.endColumn === String(currentPosition.end.column)
    );
  }, [nodeDatum, currentPosition]);

  const isPartialFocused = useMemo(() => {
    if (currentPosition === undefined) {
      return false;
    }
    const fulfilledBefore =
      Number(nodeDatum.attributes?.startLine) < currentPosition.start.line ||
      (Number(nodeDatum.attributes?.startLine) === currentPosition.start.line &&
        Number(nodeDatum.attributes?.startColumn) <=
          currentPosition.start.column);

    const fulfilledAfter =
      Number(nodeDatum.attributes?.endLine) > currentPosition.end.line ||
      (Number(nodeDatum.attributes?.endLine) === currentPosition.end.line &&
        Number(nodeDatum.attributes?.endColumn) >= currentPosition.end.column);

    return fulfilledBefore && fulfilledAfter;
  }, [nodeDatum, currentPosition]);

  return (
    <g>
      <rect
        rx="5"
        ry="5"
        style={{
          width: "250",
          height: "100",
          fill: `${
            isFullFocused ? "#FF4441" : isPartialFocused ? "#FFF86C" : "white"
          } `,
        }}
        x="-125"
        y="-50"
      />
      <text
        style={{
          fill: "black",
          strokeWidth: "0",
          fontWeight: "bold",
        }}
        x="-110"
        y="-25"
      >
        {nodeDatum.name}
      </text>
      <text
        style={{
          fill: "black",
          strokeWidth: "0",
        }}
        x="-110"
        y="0"
      >
        {`value：${nodeDatum.attributes?.value}`}
      </text>
      <text
        style={{
          fill: "black",
          strokeWidth: "0",
        }}
        x="-110"
        y="20"
      >
        {`start：(${nodeDatum.attributes?.startLine},${nodeDatum.attributes?.startColumn})`}
      </text>
      <text
        style={{
          fill: "black",
          strokeWidth: "0",
        }}
        x="-110"
        y="40"
      >
        {`end：(${nodeDatum.attributes?.endLine},${nodeDatum.attributes?.endColumn})`}
      </text>
    </g>
  );
};

export const ReadPageContent: FC = () => {
  const [authState] = useContext(AuthContext);
  const [readingState, dispatchReading] = useContext(ReadingContext);

  const [nodeList, setNodeList] = useState<CustomNode[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const nodeList = await convertCustomNodeList(readingState.baseCode);
      setNodeList(nodeList);
    })();
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
          pathFunc="step"
          renderCustomNodeElement={(props) => {
            return (
              <CustomNodeElement
                {...props}
                currentPosition={currentFocusNodePosition}
              />
            );
          }}
          separation={{ siblings: 2 }}
        />
      )}
    </div>
  );
};
