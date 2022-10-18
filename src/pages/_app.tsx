import type { AppProps } from "next/app";
import { WriteCodeContextContainer } from "../features/write/CodeProvider";
import { ReadingContextContainer } from "../features/reading/Provider";
import { ExperimentCodeContextContainer } from "../features/experiment/CodeProvider";

import "modern-css-reset";
import "../features/styles/global.css";
import { AuthContextContainer } from "../features/auth/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextContainer>
      <WriteCodeContextContainer>
        <ReadingContextContainer>
          <ExperimentCodeContextContainer>
            <Component {...pageProps} />
          </ExperimentCodeContextContainer>
        </ReadingContextContainer>
      </WriteCodeContextContainer>
    </AuthContextContainer>
  );
}

export default MyApp;
