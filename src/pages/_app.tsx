import type { AppProps } from "next/app";
import { WritingContextContainer } from "../features/write/Provider";
import { ReadingContextContainer } from "../features/reading/Provider";
import { ExperimentContextContainer } from "../features/experiment/Provider";

import "modern-css-reset";
import "../features/styles/global.css";
import { AuthContextContainer } from "../features/auth/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextContainer>
      <WritingContextContainer>
        <ReadingContextContainer>
          <ExperimentContextContainer>
            <Component {...pageProps} />
          </ExperimentContextContainer>
        </ReadingContextContainer>
      </WritingContextContainer>
    </AuthContextContainer>
  );
}

export default MyApp;
