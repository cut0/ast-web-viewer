import type { AppProps } from "next/app";
import { WriteCodeContextContainer } from "../features/write/CodeProvider";
import { ReadCodeContextContainer } from "../features/read/CodeProvider";
import { ExperimentalCodeContextContainer } from "../features/experimental/CodeProvider";

import "modern-css-reset";
import "../features/styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WriteCodeContextContainer>
      <ReadCodeContextContainer>
        <ExperimentalCodeContextContainer>
          <Component {...pageProps} />
        </ExperimentalCodeContextContainer>
      </ReadCodeContextContainer>
    </WriteCodeContextContainer>
  );
}

export default MyApp;
