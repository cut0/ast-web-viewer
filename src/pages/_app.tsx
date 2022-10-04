import type { AppProps } from "next/app";
import { WriteCodeContextContainer } from "../features/write/CodeProvider";
import { ReadCodeContextContainer } from "../features/read/CodeProvider";
import { ExplorerCodeContextContainer } from "../features/explorer/CodeProvider";

import "modern-css-reset";
import "../features/styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WriteCodeContextContainer>
      <ReadCodeContextContainer>
        <ExplorerCodeContextContainer>
          <Component {...pageProps} />
        </ExplorerCodeContextContainer>
      </ReadCodeContextContainer>
    </WriteCodeContextContainer>
  );
}

export default MyApp;
