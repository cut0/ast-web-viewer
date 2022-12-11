import { style } from "@vanilla-extract/css";
import { basic, text } from "../../features/styles/theme";

export const Header = style({
  display: "flex",
  justifyContent: "flex-end",
  position: "fixed",
  width: "100%",
  padding: "16px 8px",
  backgroundColor: "white",
  zIndex: "1",
});

export const LinkLabel = style({
  color: text.highLight,
  backgroundColor: basic.primary,
  border: "none",
  borderRadius: "16px",
  padding: "8px 16px",
  cursor: "pointer",
});

export const MainContainer = style({
  paddingTop: "72px",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
});
