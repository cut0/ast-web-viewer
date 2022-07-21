import { FunctionComponent, ComponentChildren, createContext } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";

type CodeState = { content: string };

export const CodeContext = createContext<{
  code: CodeState;
  // eslint-disable-next-line no-unused-vars
  updateCode: (_: CodeState) => void;
}>({ code: { content: "" }, updateCode: () => {} });

export const CodeProvider: FunctionComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const [localCode, setLocalCode] = useState<CodeState>({ content: "" });

  const updateLocalCode = useCallback((code: CodeState) => {
    setLocalCode(code);
  }, []);

  const value = useMemo(() => {
    return {
      code: localCode,
      updateCode: updateLocalCode,
    };
  }, [localCode, updateLocalCode]);

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
};
