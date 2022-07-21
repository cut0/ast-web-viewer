import { FC } from "preact/compat";
import { useCallback, useRef } from "preact/hooks";
import Editor, { OnMount } from "@monaco-editor/react";

export const CustomEditor: FC<{}> = () => {
  const editorRef = useRef(null);

  const handleEditorDidMount = useCallback<OnMount>((editor, monaco) => {
    editorRef.current = editor;
    monaco.languages.registerHoverProvider("javascript", {
      provideHover: (model: any, position: unknown) => {
        console.log(model.getWordAtPosition(position));
      },
    });
  }, []);

  return (
    <Editor
      defaultLanguage="javascript"
      defaultValue="// some comment"
      height="90vh"
      onMount={handleEditorDidMount}
    />
  );
};
