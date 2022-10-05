import { FC } from "react";
import { FullScreenContainer, Loader } from "./FullScreenLoader.css";

export const FullScreenLoader: FC = () => {
  return (
    <div className={FullScreenContainer}>
      <div className={Loader} />
    </div>
  );
};
