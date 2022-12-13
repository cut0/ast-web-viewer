import { useCallback, useContext, useState } from "react";
import { ExecuteContext } from "../execute/Provider";
import { execute, fetchResult } from "./ExecuteUtils";

type State =
  | { status: "initial" }
  | { status: "loading" }
  | { status: "success"; payload: string }
  | { status: "error"; payload: Error };

export const useExecute = () => {
  const [state, setState] = useState<State>({ status: "initial" });
  const [, dispatchExecute] = useContext(ExecuteContext);

  const handler = useCallback(
    async (code: string, step: number) => {
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
          dispatchExecute({
            type: "UPDATE_EXECUTE_CODE",
            step,
            status: "error",
          });
          return;
        }

        dispatchExecute({
          type: "UPDATE_EXECUTE_CODE",
          step,
          status: "success",
        });
        setState({ status: "success", payload: res.stdout });
      }, 2000);
    },
    [state.status, dispatchExecute],
  );

  return [state, handler] as const;
};
