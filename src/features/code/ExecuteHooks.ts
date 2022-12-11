import { useCallback, useState } from "react";
import { execute, fetchResult } from "./ExecuteUtils";

type State =
  | { status: "initial" }
  | { status: "loading" }
  | { status: "success"; payload: string }
  | { status: "error"; payload: Error };

export const useExecute = () => {
  const [state, setState] = useState<State>({ status: "initial" });

  const handler = useCallback(
    async (code: string) => {
      if (state.status === "loading") {
        return;
      }

      setState({ status: "loading" });

      const executeRes = await execute(code).catch((e) => {
        return e;
      });

      if (executeRes instanceof Error) {
        setState({ status: "error", payload: executeRes });
        return;
      }

      setTimeout(async () => {
        const res = await fetchResult(executeRes.id).catch((e) => {
          return e;
        });

        if (res instanceof Error) {
          setState({ status: "error", payload: res });
          return;
        }

        setState({ status: "success", payload: res.stdout });
      }, 2000);
    },
    [state.status],
  );

  return [state, handler] as const;
};
