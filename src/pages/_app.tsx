import type { AppProps } from "next/app";
import { WriteCodeContextContainer } from "../features/write/CodeProvider";
import { ReadingContextContainer } from "../features/reading/Provider";
import { ExperimentContextContainer } from "../features/experiment/Provider";

import "modern-css-reset";
import "../features/styles/global.css";
import { AuthContextContainer } from "../features/auth/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextContainer>
      <WriteCodeContextContainer>
        <ReadingContextContainer>
          <ExperimentContextContainer>
            <Component {...pageProps} />
          </ExperimentContextContainer>
        </ReadingContextContainer>
      </WriteCodeContextContainer>
    </AuthContextContainer>
  );
}

export default MyApp;
