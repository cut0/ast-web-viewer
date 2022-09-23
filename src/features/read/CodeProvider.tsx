import { ReactNode, createContext, FC, Reducer, useReducer } from "react";

type Action =
  | { type: "ADD_AST"; astString: string }
  | { type: "REMOVE_AST"; index: number };

type State = {
  payload: {
    astString: string;
    date: Date;
  }[];
};

export const readCodeInitialState: State = { payload: [] };

export const readCodeReducer: Reducer<State, Action> = (
  state: State,
  action: Action,
) => {
  switch (action.type) {
    case "ADD_AST":
      return {
        payload: [
          ...state.payload,
          { astString: action.astString, date: new Date() },
        ],
      };
    case "REMOVE_AST":
      return {
        payload: state.payload.filter((_, i) => {
          return i !== action.index;
        }),
      };
  }
};

export const ReadCodeContext = createContext<[State, (action: Action) => void]>(
  [readCodeInitialState, () => {}],
);

export const ReadCodeContextContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(readCodeReducer, readCodeInitialState);

  return (
    <ReadCodeContext.Provider value={[state, dispatch]}>
      {children}
    </ReadCodeContext.Provider>
  );
};
