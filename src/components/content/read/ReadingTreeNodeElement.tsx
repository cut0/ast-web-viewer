import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { FC, useMemo } from "react";

type ReadingTreeNodeElementProps = {
  nodeDatum: RawNodeDatum;
  currentPosition?: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  };
};

export const ReadingTreeNodeElement: FC<ReadingTreeNodeElementProps> = ({
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
          height: "120",
          fill: `${
            isFullFocused ? "#FF4441" : isPartialFocused ? "#FFF86C" : "white"
          } `,
        }}
        x="-125"
        y="-60"
      />
      <text
        style={{
          fill: "black",
          strokeWidth: "0",
          fontWeight: "bold",
        }}
        x="-110"
        y="-35"
      >
        {nodeDatum.name}
      </text>
      <text
        style={{
          fill: "black",
          strokeWidth: "0",
        }}
        x="-110"
        y="-10"
      >
        {`id：${nodeDatum.attributes?.id}`}
      </text>
      <text
        style={{
          fill: "black",
          strokeWidth: "0",
        }}
        x="-110"
        y="10"
      >
        {`value：${nodeDatum.attributes?.value}`}
      </text>
      <text
        style={{
          fill: "black",
          strokeWidth: "0",
        }}
        x="-110"
        y="30"
      >
        {`start：(${nodeDatum.attributes?.startLine},${nodeDatum.attributes?.startColumn})`}
      </text>
      <text
        style={{
          fill: "black",
          strokeWidth: "0",
        }}
        x="-110"
        y="50"
      >
        {`end：(${nodeDatum.attributes?.endLine},${nodeDatum.attributes?.endColumn})`}
      </text>
    </g>
  );
};
