import { ReactNode, createContext, FC, Reducer, useReducer } from "react";
import { CustomNode } from "../code/AstUtils";

const BASE_CODE = `const terminateFunc = (count, handler) => {
  let countRef = 0;
  return new Promise((resolve, reject) => {
    if (count < 0) {
      reject()
    }
    const timerId = setInterval(() => {
      if (countRef === count) {
        clearInterval(timerId)
        resolve()
        return
      }
      handler()
      countRef += 1
    }, 1000)
  })

}

class TerninateFuncCreator {
  constructor(count, handler) {
    this.count = count;
    this.handler = handler;
  }
  up() {
    this.count += 1
  }
  down() {
    this.count -= 1
  }
  async dispatch() {
    return await terminateFunc(this.count, this.handler)
  }
}

const main = () => {
  const terminateFuncCreator = new TerninateFuncCreator(2, () => console.log("hello"))
  terminateFuncCreator.up()
  terminateFuncCreator.up()
  terminateFuncCreator.down()
  terminateFuncCreator.dispatch().then(() => {
    console.log("Finish")
  })
}

main()`;

type Action =
  | { type: "SETUP_TARGET_CODE"; code: string; nodeList: CustomNode[] }
  | {
      type: "UPDATE_READ_POINT";
      position: {
        start: { line: number; column: number };
        end: { line: number; column: number };
      };
    };

type State = {
  baseCode: string;
  payload: {
    position: {
      start: { line: number; column: number };
      end: { line: number; column: number };
    };
  }[];
};

export const readingInitialState: State = {
  baseCode: BASE_CODE,
  payload: [],
};

export const readingReducer: Reducer<State, Action> = (
  state: State,
  action: Action,
) => {
  switch (action.type) {
    case "SETUP_TARGET_CODE":
      return {
        ...state,
        baseCode: action.code,
        nodeList: action.nodeList,
      };
    case "UPDATE_READ_POINT":
      return {
        ...state,
        payload: [...state.payload, { position: action.position }],
      };
  }
};

export const ReadingContext = createContext<[State, (action: Action) => void]>([
  readingInitialState,
  () => {},
]);

export const ReadingContextContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(readingReducer, readingInitialState);

  return (
    <ReadingContext.Provider value={[state, dispatch]}>
      {children}
    </ReadingContext.Provider>
  );
};