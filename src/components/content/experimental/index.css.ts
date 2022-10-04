import { style } from "@vanilla-extract/css";
import { basic, text } from "../../../features/styles/theme";

export const MultiEditorContainer = style({
  padding: "8px",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "auto 1fr",
});

export const AnalyticsLinkContainer = style({
  gridColumn: "1 / -1",
  display: "flex",
  justifyContent: "flex-end",
  padding: "0 0 8px 0",
});

export const AnalyticsLink = style({
  color: text.highLight,
  backgroundColor: basic.primary,
  border: "none",
  borderRadius: "16px",
  padding: "8px 16px",
  cursor: "pointer",
});
