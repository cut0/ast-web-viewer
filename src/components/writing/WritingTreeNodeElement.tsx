import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { FC } from "react";

type WritingTreeNodeElementProps = {
  nodeDatum: RawNodeDatum;
};

export const WritingTreeNodeElement: FC<WritingTreeNodeElementProps> = ({
  nodeDatum,
}) => {
  return (
    <g>
      <rect
        rx="5"
        ry="5"
        style={{
          width: "250",
          height: "140",
          fill: "white",
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
        {`depth：${nodeDatum.attributes?.depth}`}
      </text>
      <text
        style={{
          fill: "black",
          strokeWidth: "0",
        }}
        x="-110"
        y="10"
      >
        {`strahlerNumber：${nodeDatum.attributes?.strahlerNumber}`}
      </text>
      <text
        style={{
          fill: "black",
          strokeWidth: "0",
        }}
        x="-110"
        y="30"
      >
        {`value：${nodeDatum.attributes?.value}`}
      </text>
      <text
        style={{
          fill: "black",
          strokeWidth: "0",
        }}
        x="-110"
        y="50"
      >
        {`start：(${nodeDatum.attributes?.startLine},${nodeDatum.attributes?.startColumn})`}
      </text>
      <text
        style={{
          fill: "black",
          strokeWidth: "0",
        }}
        x="-110"
        y="70"
      >
        {`end：(${nodeDatum.attributes?.endLine},${nodeDatum.attributes?.endColumn})`}
      </text>
    </g>
  );
};
