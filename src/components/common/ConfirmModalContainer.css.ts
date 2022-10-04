import { style } from "@vanilla-extract/css";
import { background, text, basic } from "../../features/styles/theme";

export const CloseButton = style({
  width: "48px",
  height: "48px",
  position: "absolute",
  top: "-20px",
  right: "-20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  background: background.default,
  border: "none",
  cursor: "pointer",
});

export const ButtonListContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2 , 1fr)",
  gap: "8px",
  paddingTop: "16px",
});

export const AcceptButton = style({
  color: text.highLight,
  backgroundColor: basic.primary,
  border: "none",
  borderRadius: "16px",
  padding: "8px 16px",
  cursor: "pointer",
});

export const CancelButton = style({
  color: basic.primary,
  borderColor: basic.primary,
  backgroundColor: background.default,
  borderRadius: "16px",
  padding: "8px 16px",
  cursor: "pointer",
});
