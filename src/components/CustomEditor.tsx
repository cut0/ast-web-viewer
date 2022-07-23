import { FunctionComponent } from "preact";
import { useCallback, useContext, useRef } from "preact/hooks";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { CodeContext } from "../features/code/CodeProvider";

export const CustomEditor: FunctionComponent<{}> = () => {
  const { updateCode } = useContext(CodeContext);
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

  const onChange = useCallback(
    (value: string) => {
      updateCode({ content: value });
    },
    [updateCode],
  );

  return (
    <Editor
      defaultLanguage="javascript"
      defaultValue="const t = 'Hello World!!';"
      height="100vh"
      onChange={onChange}
      onMount={handleEditorDidMount}
    />
  );
};
