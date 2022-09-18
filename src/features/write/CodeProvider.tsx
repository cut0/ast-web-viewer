import { ComponentChildren, createContext, FunctionalComponent } from "preact";
import { Reducer, useReducer } from "preact/hooks";

type Action =
  | { type: "ADD_AST"; astString: string }
  | { type: "REMOVE_AST"; index: number };

type State = {
  payload: {
    astString: string;
    date: Date;
  }[];
};

export const writeCodeInitialState: State = { payload: [] };

export const writeCodeReducer: Reducer<State, Action> = (
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

export const WriteCodeContext = createContext<
  // eslint-disable-next-line no-unused-vars
  [State, (action: Action) => void]
>([writeCodeInitialState, () => {}]);

export const WriteCodeContextContainer: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(writeCodeReducer, writeCodeInitialState);

  return (
    <WriteCodeContext.Provider value={[state, dispatch]}>
      {children}
    </WriteCodeContext.Provider>
  );
};
