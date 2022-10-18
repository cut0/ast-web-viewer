import { useCallback, useRef, FC } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

type CustomViewerProps = {
  code: string;
  onHover?: (position: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  }) => void;
};

export const CustomViewer: FC<CustomViewerProps> = ({ code, onHover }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = useCallback<OnMount>(
    (editor, monaco) => {
      editorRef.current = editor;
      monaco.languages.registerHoverProvider("javascript", {
        provideHover: (model, position) => {
          const pos = model.getWordAtPosition(position);
          if (pos === null || onHover === undefined) {
            return null;
          }
          /**
           * AST 上のものと対応させるため列を -1
           */
          onHover({
            start: { line: position.lineNumber, column: pos.startColumn - 1 },
            end: { line: position.lineNumber, column: pos.endColumn - 1 },
          });
          return null;
        },
      });
    },
    [onHover],
  );

  return (
    <Editor
      defaultLanguage="javascript"
      height="100vh"
      options={{ readOnly: true }}
      value={code}
      onMount={handleEditorDidMount}
    />
  );
};
