import { FC } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { basic } from "../../features/styles/theme";

type AstInfoGraphProps = {
  timeSeriesParams: {
    nodeCount: number;
    averageStrahlerNumber: number;
    averageDepth: number;
  }[];
  executeList: { step: number; status: "error" | "success" }[];
  onClickGraph: (step: number) => void;
};

export const AstInfoGraph: FC<AstInfoGraphProps> = ({
  timeSeriesParams,
  executeList,
  onClickGraph,
}) => {
  console.log(executeList);
  return (
    <ResponsiveContainer>
      <LineChart
        data={timeSeriesParams}
        onClick={(e) => {
          if (e.activeTooltipIndex === undefined) {
            return;
          }
          onClickGraph(e.activeTooltipIndex);
        }}
      >
        <Line
          dataKey="nodeCount"
          isAnimationActive={false}
          stroke="#8884d8"
          type="monotone"
        />
        <Line
          dataKey="averageStrahlerNumber"
          isAnimationActive={false}
          stroke="#82ca9d"
          type="monotone"
        />
        <Line
          dataKey="averageDepth"
          isAnimationActive={false}
          stroke="#f2a83a"
          type="monotone"
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="step" />
        <YAxis />
        <Tooltip />
        {executeList.map((execute) =>
          execute.status === "success" ? (
            <ReferenceLine stroke={basic.success} x={execute.step - 1} />
          ) : execute.status === "error" ? (
            <ReferenceLine stroke={basic.error} x={execute.step - 1} />
          ) : undefined,
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};
