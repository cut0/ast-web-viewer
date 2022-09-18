import Router from "preact-router";
import AsyncRoute from "preact-async-route";
import "modern-css-reset";
import "./app.css";
import { WriteCodeContextContainer } from "./features/write/CodeProvider";
import { ReadCodeContextContainer } from "./features/read/CodeProvider";

export const App = () => {
  return (
    <>
      <Router>
        <AsyncRoute
          getComponent={() =>
            import("./pages").then((module) => module.default)
          }
          path="/"
        />
        <AsyncRoute
          getComponent={() =>
            import("./pages/explorer").then((module) => module.default)
          }
          path="/explorer"
        />
      </Router>
      <WriteCodeContextContainer>
        <Router>
          <AsyncRoute
            getComponent={() =>
              import("./pages/write").then((module) => module.default)
            }
            path="/write"
          />
          <AsyncRoute
            getComponent={() =>
              import("./pages/write/analytics").then((module) => module.default)
            }
            path="/write/analytics"
          />
        </Router>
      </WriteCodeContextContainer>
      <ReadCodeContextContainer>
        <Router>
          <AsyncRoute
            getComponent={() =>
              import("./pages/read").then((module) => module.default)
            }
            path="/read"
          />
          <AsyncRoute
            getComponent={() =>
              import("./pages/read/analytics").then((module) => module.default)
            }
            path="/read/analytics"
          />
        </Router>
      </ReadCodeContextContainer>
    </>
  );
};
