import { style } from "@vanilla-extract/css";
import { background, basic, color, text } from "../../../features/styles/theme";

export const NotFoundPageContainer = style({
  maxWidth: "960px",
  margin: "0 auto",
  padding: "32px",
});

export const LinkButton = style({
  color: basic.primary,
});

export const PageContainer = style({
  width: "100%",
  padding: "32px",
  display: "grid",
  height: "100vh",
  gridTemplateRows: "auto 1fr",
  gap: "16px",
});

export const Header = style({
  gridColumn: "1 / -1",
  display: "flex",
  justifyContent: "flex-end",
  gap: "16px",
});

export const ProfileImageContainer = style({
  backgroundColor: background.loading,
  height: "100%",
  borderRadius: "50%",
  aspectRatio: "1 / 1",
  border: "none",
  cursor: "pointer",
});

export const SubmitCodeButton = style({
  color: text.highLight,
  backgroundColor: basic.primary,
  border: "none",
  borderRadius: "16px",
  padding: "8px 16px",
  cursor: "pointer",
});

export const TreeViewerContainer = style({
  border: color.black,
  borderRadius: "16px",
  boxShadow: "0 1px 10px -4px #c6c8ca",
});
