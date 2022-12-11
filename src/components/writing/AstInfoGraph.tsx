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
};

export const AstInfoGraph: FC<AstInfoGraphProps> = ({ timeSeriesParams }) => {
  return (
    <ResponsiveContainer>
      <LineChart data={timeSeriesParams}>
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
        <XAxis />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
