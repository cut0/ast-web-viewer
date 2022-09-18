import Router from "preact-router";
import { TopPage } from "./pages";
import { ExplorerPage } from "./pages/explorer";
import { ReadPage } from "./pages/read";
import { ReadAnalyticsPage } from "./pages/read/analytics";
import { WritePage } from "./pages/write";
import { WriteAnalyticsPage } from "./pages/write/analytics";
import "modern-css-reset";

export const App = () => {
  return (
    <Router>
      <TopPage path="/" />
      <ReadPage path="/read" />
      <ReadAnalyticsPage path="/read/analytics" />
      <WritePage path="/write" />
      <WriteAnalyticsPage path="/write/analytics" />
      <ExplorerPage path="/explorer" />
    </Router>
  );
};
