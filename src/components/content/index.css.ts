import { style } from "@vanilla-extract/css";
import { basic, fontSize, background } from "../../features/styles/theme";

export const PageContainer = style({
  maxWidth: "960px",
  margin: "0 auto",
  padding: "32px",
});

export const Header = style({
  gridColumn: "1 / -1",
  display: "flex",
  justifyContent: "flex-end",
  gap: "16px",
  padding: "16px 0",
});

export const ProfileImageContainer = style({
  backgroundColor: background.loading,
  position: "relative",
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
});

export const ProfileImage = style({ borderRadius: "50%" });

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
