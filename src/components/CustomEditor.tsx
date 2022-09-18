import { FunctionComponent } from "preact";
import { useCallback, useRef } from "preact/hooks";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

type CustomEditorProps = {
  // eslint-disable-next-line no-unused-vars
  onCodeChange: (code: string) => void;
};

export const CustomEditor: FunctionComponent<CustomEditorProps> = ({
  onCodeChange,
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

  const onChange = useCallback(
    (value: string) => {
      onCodeChange(value);
    },
    [onCodeChange],
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
