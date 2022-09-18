import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopPage from "./pages";
import ReadPage from "./pages/read";
import ReadAnalyticsPage from "./pages/read/analytics";
import WritePage from "./pages/write";
import WriteAnalyticsPage from "./pages/write/analytics";
import ExplorerPage from "./pages/explorer";

import "modern-css-reset";
import "./app.css";
import { WriteCodeContextContainer } from "./features/write/CodeProvider";
import { ReadCodeContextContainer } from "./features/read/CodeProvider";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TopPage />} path="/" />
        <Route element={<ExplorerPage />} path="/explorer" />
      </Routes>
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
