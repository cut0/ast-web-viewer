import { useCallback, useRef, FC } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

type CustomViewerProps = {
  code: string;
};

export const CustomViewer: FC<CustomViewerProps> = ({ code }) => {
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

  return (
    <Editor
      defaultLanguage="json"
      height="100vh"
      options={{ readOnly: true }}
      value={code}
      onMount={handleEditorDidMount}
    />
  );
};
