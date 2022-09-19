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

export const explorerCodeInitialState: State = { payload: [] };

export const explorerCodeReducer: Reducer<State, Action> = (
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

export const ExplorerCodeContext = createContext<
  // eslint-disable-next-line no-unused-vars
  [State, (action: Action) => void]
>([explorerCodeInitialState, () => {}]);

export const ExplorerCodeContextContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(
    explorerCodeReducer,
    explorerCodeInitialState,
  );

  return (
    <ExplorerCodeContext.Provider value={[state, dispatch]}>
      {children}
    </ExplorerCodeContext.Provider>
  );
};
