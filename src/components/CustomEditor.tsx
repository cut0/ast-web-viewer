import { useCallback, useRef, FC } from "react";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

type CustomEditorProps = {
  onCodeChange: (code: string) => void;
  defaultValue?: string;
};

export const CustomEditor: FC<CustomEditorProps> = ({
  onCodeChange,
  defaultValue,
}) => {
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

  const onChange = useCallback<OnChange>(
    (value) => {
      if (value === undefined) {
        return;
      }
      onCodeChange(value);
    },
    [onCodeChange],
  );

  return (
    <Editor
      defaultLanguage="javascript"
      defaultValue={defaultValue}
      height="100vh"
      onChange={onChange}
      onMount={handleEditorDidMount}
    />
  );
};
