import type { AppProps } from "next/app";
import { WriteCodeContextContainer } from "../features/write/CodeProvider";
import { ReadCodeContextContainer } from "../features/read/CodeProvider";
import { ExperimentalCodeContextContainer } from "../features/experimental/CodeProvider";

import "modern-css-reset";
import "../features/styles/global.css";
import { AuthContextContainer } from "../features/auth/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextContainer>
      <WriteCodeContextContainer>
        <ReadCodeContextContainer>
          <ExperimentalCodeContextContainer>
            <Component {...pageProps} />
          </ExperimentalCodeContextContainer>
        </ReadCodeContextContainer>
      </WriteCodeContextContainer>
    </AuthContextContainer>
  );
}

export default MyApp;
