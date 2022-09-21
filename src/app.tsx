import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopPage from "./pages";
import ReadPage from "./pages/read";
import ReadAnalyticsPage from "./pages/read/analytics";
import WritePage from "./pages/write";
import WriteAnalyticsPage from "./pages/write/analytics";
import ExplorerPage from "./pages/explorer";
import ExplorerAnalyticsPage from "./pages/explorer/analytics";
import { WriteCodeContextContainer } from "./features/write/CodeProvider";
import { ReadCodeContextContainer } from "./features/read/CodeProvider";
import { ExplorerCodeContextContainer } from "./features/explorer/CodeProvider";
import "modern-css-reset";
import "./app.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TopPage />} path="/" />
      </Routes>
      <ExplorerCodeContextContainer>
        <Routes>
          <Route element={<ExplorerPage />} path="/explorer" />
          <Route
            element={<ExplorerAnalyticsPage />}
            path="/explorer/analytics"
          />
        </Routes>
      </ExplorerCodeContextContainer>
      <ReadCodeContextContainer>
        <Routes>
          <Route element={<ReadPage />} path="/read" />
          <Route element={<ReadAnalyticsPage />} path="/read/analytics" />
        </Routes>
      </ReadCodeContextContainer>
      <WriteCodeContextContainer>
        <Routes>
          <Route element={<WritePage />} path="/write" />
          <Route element={<WriteAnalyticsPage />} path="/write/analytics" />
        </Routes>
      </WriteCodeContextContainer>
    </BrowserRouter>
  );
};
