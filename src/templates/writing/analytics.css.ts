import { style } from "@vanilla-extract/css";
import { background, basic, color, text } from "../../features/styles/theme";

export const Header = style({
  width: "100%",
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  position: "fixed",
  backgroundColor: "white",
  zIndex: "1",
});

export const HeaderLeftContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const HeaderRightContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  alignItems: "center",
  justifyItems: "flex-end",
  gap: "8px",
});

export const ProfileImageContainer = style({
  backgroundColor: background.loading,
  position: "relative",
  height: "40px",
  borderRadius: "50%",
  aspectRatio: "1 / 1",
  border: "none",
  cursor: "pointer",
});

export const ProfileImage = style({ borderRadius: "50%" });

export const PlayingButton = style({
  color: text.highLight,
  backgroundColor: basic.error,
  border: "none",
  borderRadius: "16px",
  padding: "8px 16px",
  cursor: "pointer",
});

export const StoppingButton = style({
  backgroundColor: basic.success,
  border: "none",
  borderRadius: "16px",
  padding: "8px 16px",
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

export const LinkLabel = style({
  color: text.highLight,
  backgroundColor: basic.primary,
  border: "none",
  borderRadius: "16px",
  padding: "8px 16px",
  cursor: "pointer",
});

export const MainContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  padding: "72px 16px 0px",
});

export const InfoContainer = style({
  display: "grid",
  gridTemplateRows: "repeat(2, 1fr)",
});

export const UserInputContainer = style({
  paddingTop: "16px",
});

export const UserInputLabel = style({
  marginRight: "16px",
});
