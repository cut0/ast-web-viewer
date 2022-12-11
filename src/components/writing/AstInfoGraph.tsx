import { FC } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type AstInfoGraphProps = {
  timeSeriesParams: {
    nodeCount: number;
    averageStrahlerNumber: number;
    averageDepth: number;
  }[];
  onClickGraph: (step: number) => void;
};

export const AstInfoGraph: FC<AstInfoGraphProps> = ({
  timeSeriesParams,
  onClickGraph,
}) => {
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
        <XAxis
          onClick={() => {
            console.log("hello");
          }}
        />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
