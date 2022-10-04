import { ReactNode, createContext, FC, Reducer, useReducer } from "react";
import { CustomNode } from "../code/AstUtils";

type Action =
  | { type: "UPDATE_NODE_LIST"; nodeList: CustomNode[] }
  | { type: "ADD_NODE"; node: CustomNode }
  | { type: "REMOVE_NODE"; index: number }
  | { type: "RESET_NODE_LIST" };

type State = {
  payload: CustomNode[];
};

export const experimentCodeInitialState: State = { payload: [] };

export const experimentCodeReducer: Reducer<State, Action> = (
  state: State,
  action: Action,
) => {
  switch (action.type) {
    case "UPDATE_NODE_LIST":
      return {
        payload: action.nodeList,
      };
    case "ADD_NODE":
      return {
        payload: [...state.payload, action.node],
      };
    case "REMOVE_NODE":
      return {
        payload: state.payload.filter((_, i) => {
          return i !== action.index;
        }),
      };
    case "RESET_NODE_LIST":
      return {
        payload: [],
      };
  }
};

export const ExperimentCodeContext = createContext<
  [State, (action: Action) => void]
>([experimentCodeInitialState, () => {}]);

export const ExperimentCodeContextContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(
    experimentCodeReducer,
    experimentCodeInitialState,
  );

  return (
    <ExperimentCodeContext.Provider value={[state, dispatch]}>
      {children}
    </ExperimentCodeContext.Provider>
  );
};
