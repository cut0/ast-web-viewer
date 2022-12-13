import type { AppProps } from "next/app";
import { WritingContextContainer } from "../features/writing/Provider";

import "modern-css-reset";
import "../features/styles/global.css";
import { AuthContextContainer } from "../features/auth/AuthProvider";
import { ExecuteContextContainer } from "../features/execute/Provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ExecuteContextContainer>
      <AuthContextContainer>
        <WritingContextContainer>
          <Component {...pageProps} />
        </WritingContextContainer>
      </AuthContextContainer>
    </ExecuteContextContainer>
  );
}

export default MyApp;
