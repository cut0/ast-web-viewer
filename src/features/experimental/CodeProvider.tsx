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

export const experimentalCodeInitialState: State = { payload: [] };

export const experimentalCodeReducer: Reducer<State, Action> = (
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

export const ExperimentalCodeContext = createContext<
  [State, (action: Action) => void]
>([experimentalCodeInitialState, () => {}]);

export const ExperimentalCodeContextContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(
    experimentalCodeReducer,
    experimentalCodeInitialState,
  );

  return (
    <ExperimentalCodeContext.Provider value={[state, dispatch]}>
      {children}
    </ExperimentalCodeContext.Provider>
  );
};
