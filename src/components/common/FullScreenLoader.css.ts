import { keyframes, style } from "@vanilla-extract/css";
import { background, basic } from "../../features/styles/theme";

export const FullScreenContainer = style({
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  zIndex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.62);",
});

export const rotate = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

export const Loader = style({
  border: `8px solid ${background.default}`,
  borderTop: ` 8px solid ${basic.primary}`,
  borderRadius: "50%",
  width: "80px",
  height: "80px",
  position: "fixed",
  top: "calc(50% - 40px)",
  left: "calc(50% - 40px)",
  animation: `${rotate} 1s linear infinite`,
});
