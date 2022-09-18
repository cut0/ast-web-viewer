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

export const ReadCodeContext = createContext<
  // eslint-disable-next-line no-unused-vars
  [State, (action: Action) => void]
>([readCodeInitialState, () => {}]);

export const ReadCodeContextContainer: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(readCodeReducer, readCodeInitialState);

  return (
    <ReadCodeContext.Provider value={[state, dispatch]}>
      {children}
    </ReadCodeContext.Provider>
  );
};
