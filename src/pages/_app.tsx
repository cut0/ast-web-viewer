import type { AppProps } from "next/app";
import { WritingContextContainer } from "../features/writing/Provider";

import "modern-css-reset";
import "../features/styles/global.css";
import { AuthContextContainer } from "../features/auth/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextContainer>
      <WritingContextContainer>
        <Component {...pageProps} />
      </WritingContextContainer>
    </AuthContextContainer>
  );
}

export default MyApp;
