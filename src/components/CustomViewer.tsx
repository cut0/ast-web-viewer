import { FunctionComponent } from "preact";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "preact/hooks";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { CodeContext } from "../features/code/CodeProvider";

export const CustomViewer: FunctionComponent<{}> = () => {
  const { code } = useContext(CodeContext);
  const [astString, setAstString] = useState(code.content);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = useCallback<OnMount>((editor, monaco) => {
    editorRef.current = editor;
    monaco.languages.registerHoverProvider("javascript", {
      provideHover: (model, position) => {
        console.log(model.getWordAtPosition(position));
        return null;
      },
    });
  }, []);

  useEffect(() => {
    (async () => {
      const babylon = await import("babylon");
      let ast = undefined;
      try {
        ast = babylon.parse(code.content);
      } catch {
        console.info("パース失敗");
      }
      const astString = JSON.stringify(ast, null, 2);
      setAstString(astString);
    })();
  }, [code]);

  return (
    <Editor
      defaultLanguage="json"
      height="90vh"
      value={astString}
      onMount={handleEditorDidMount}
    />
  );
};
