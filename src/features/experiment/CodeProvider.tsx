import { ReactNode, createContext, FC, Reducer, useReducer } from "react";
import { CustomNode } from "../code/AstUtils";

type Action =
  | { type: "UPDATE_NODE_LIST"; nodeList: CustomNode[]; baseCode: string }
  | { type: "ADD_NODE"; node: CustomNode; baseCode: string }
  | { type: "REMOVE_NODE"; index: number; baseCode: string }
  | { type: "RESET_NODE_LIST" };

type State = {
  payload: {
    baseCode: string;
    nodeList: CustomNode[];
  };
};

export const experimentCodeInitialState: State = {
  payload: {
    baseCode: "",
    nodeList: [],
  },
};

export const experimentCodeReducer: Reducer<State, Action> = (
  state: State,
  action: Action,
) => {
  switch (action.type) {
    case "UPDATE_NODE_LIST":
      return {
        payload: {
          baseCode: action.baseCode,
          nodeList: action.nodeList,
        },
      };
    case "ADD_NODE":
      return {
        payload: {
          baseCode: action.baseCode,
          nodeList: [...state.payload.nodeList, action.node],
        },
      };
    case "REMOVE_NODE":
      return {
        payload: {
          baseCode: action.baseCode,
          nodeList: state.payload.nodeList.filter((_, i) => {
            return i !== action.index;
          }),
        },
      };
    case "RESET_NODE_LIST":
      return {
        payload: {
          baseCode: "",
          nodeList: [],
        },
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
