import { globalStyle } from "@vanilla-extract/css";
import { background, text } from "./features/styles/theme";

globalStyle("html", {
  fontSize: "16px",
  textSizeAdjust: "100%",
  color: text.default,
  backgroundColor: background.default,
});

globalStyle("a", {
  textDecoration: "none",
});

globalStyle("a:any-link", {
  color: text.default,
});
