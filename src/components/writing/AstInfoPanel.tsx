import { FC } from "react";
import { PanelContainer } from "./AstInfoPanel.css";

type AstInfoPanelProps = {
  stepCount: number;
  nodeCount: number;
  averageStrahlerNumber: number;
  averageDepth: number;
};

export const AstInfoPanel: FC<AstInfoPanelProps> = ({
  stepCount,
  nodeCount,
  averageStrahlerNumber,
  averageDepth,
}) => {
  return (
    <div className={PanelContainer}>
      <p>StepCount:{stepCount}</p>
      <p>NodeCount:{nodeCount}</p>
      <p>AverageStrahlerNumber:{averageStrahlerNumber}</p>
      <p>AverageDepth:{averageDepth}</p>
    </div>
  );
};
