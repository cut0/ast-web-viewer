import { style } from "@vanilla-extract/css";
import { basic, fontSize } from "../features/styles/theme";

export const PageContainer = style({
  maxWidth: "960px",
  margin: "0 auto",
  padding: "32px",
});

export const CardListContainer = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "16px",
});

export const CardContainer = style({
  borderRadius: "8px",
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "8px",
  padding: "16px",
  boxShadow: "0 1px 10px -4px #c6c8ca",
});

export const CardTitle = style({
  fontSize: fontSize.s4,
});

export const CardSummary = style({
  fontSize: fontSize.s6,
});

export const CardNav = style({
  textAlign: "right",
  color: basic.primary,
  fontSize: fontSize.s6,
});
