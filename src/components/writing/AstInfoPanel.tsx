import { FC } from "react";
import { PanelContainer } from "./AstInfoPanel.css";

type AstInfoPanelProps = {
  nodeCount: number;
  averageStrahlerNumber: number;
  averageDepth: number;
};

export const AstInfoPanel: FC<AstInfoPanelProps> = ({
  nodeCount,
  averageStrahlerNumber,
  averageDepth,
}) => {
  return (
    <div className={PanelContainer}>
      <p>NodeCount:{nodeCount}</p>
      <p>AverageStrahlerNumber:{averageStrahlerNumber}</p>
      <p>AverageDepth:{averageDepth}</p>
    </div>
  );
};
