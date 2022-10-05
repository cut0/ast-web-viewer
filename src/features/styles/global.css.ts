import { globalStyle } from "@vanilla-extract/css";
import { background, text } from "./theme";

globalStyle("html", {
  fontSize: "16px",
  textSizeAdjust: "100%",
  color: text.default,
  backgroundColor: background.default,
});

globalStyle("a", {
  textDecoration: "none",
});

globalStyle("a", {
  color: text.default,
});
