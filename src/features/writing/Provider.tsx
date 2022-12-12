import { ReactNode, createContext, FC, Reducer, useReducer } from "react";
import { CustomNode } from "../code/AstUtils";

type Action = {
  type: "UPDATE_AST";
  rawProgram: string;
  customNodeList: CustomNode[];
};

type State = {
  payload: {
    customNodeList: CustomNode[];
    rawProgram: string;
    date: Date;
  }[];
};

export const writingInitialState: State = { payload: [] };

export const writingReducer: Reducer<State, Action> = (
  state: State,
  action: Action,
) => {
  switch (action.type) {
    case "UPDATE_AST":
      return {
        ...state,
        payload: [
          ...state.payload,
          {
            customNodeList: action.customNodeList,
            date: new Date(),
            rawProgram: action.rawProgram,
          },
        ],
      };
  }
};

export const WritingContext = createContext<[State, (action: Action) => void]>([
  writingInitialState,
  () => {},
]);

export const WritingContextContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(writingReducer, writingInitialState);

  return (
    <WritingContext.Provider value={[state, dispatch]}>
      {children}
    </WritingContext.Provider>
  );
};
