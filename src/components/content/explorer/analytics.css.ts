import { style } from "@vanilla-extract/css";
import { basic } from "../../../features/styles/theme";

export const PageContainer = style({
  maxWidth: "960px",
  margin: "0 auto",
  padding: "32px",
});

export const LinkText = style({
  color: basic.primary,
});

export const TreeContainer = style({
  width: "100%",
  height: "100vh",
});
