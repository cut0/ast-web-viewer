import { keyframes, style } from "@vanilla-extract/css";
import { basic, text } from "../../features/styles/theme";

export const DropDownAnimation = keyframes({});

export const ErrorToast = style({
  backgroundColor: basic.error,
  boxShadow: "0px 4px 6px　#d0080e",
  color: text.highLight,
  borderRadius: "8px",
  position: "fixed",
  top: "32px",
  left: "50%",
  transform: "translate(-50%,0)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px",
  minWidth: "200px",
  gap: "16px",
  animationDirection: "alternate",
  animation: `${DropDownAnimation} ease 0.3s 1 normal`,
});

export const SuccessToast = style({
  backgroundColor: basic.success,
  boxShadow: "0px 4px 6px #2fcf81",
  color: text.default,
  borderRadius: "8px",
  position: "fixed",
  top: "32px",
  left: "50%",
  transform: "translate(-50%,0)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px",
  minWidth: "200px",
  gap: "16px",
  animationDirection: "alternate",
  animation: `${DropDownAnimation} ease 0.3s 1 normal`,
});

export const Label = style({
  fontWeight: "bold",
  textAlign: "center",
  flexShrink: 0,
});

export const CloseButton = style({
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
});
