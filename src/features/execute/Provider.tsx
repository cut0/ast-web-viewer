import { ReactNode, createContext, FC, Reducer, useReducer } from "react";

type Action = {
  type: "UPDATE_EXECUTE_CODE";
  step: number;
  status: "success" | "error";
};

type State = {
  payload: {
    step: number;
    status: "success" | "error";
  }[];
};

export const executeInitialState: State = { payload: [] };

export const executeReducer: Reducer<State, Action> = (
  state: State,
  action: Action,
) => {
  switch (action.type) {
    case "UPDATE_EXECUTE_CODE":
      return {
        ...state,
        payload: [
          ...state.payload,
          { step: action.step, status: action.status },
        ],
      };
  }
};

export const ExecuteContext = createContext<[State, (action: Action) => void]>([
  executeInitialState,
  () => {},
]);

export const ExecuteContextContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(executeReducer, executeInitialState);

  return (
    <ExecuteContext.Provider value={[state, dispatch]}>
      {children}
    </ExecuteContext.Provider>
  );
};
