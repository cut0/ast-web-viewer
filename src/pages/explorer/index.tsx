import { FunctionComponent } from "preact";
import { MultiEditorContainer } from "./index.css";
import { CustomEditor } from "../../components/CustomEditor";
import { CustomViewer } from "../../components/CustomViewer";
import { useState } from "preact/hooks";
import { convertAstString } from "../../features/code/AstUtils";

const ExplorerPage: FunctionComponent = () => {
  const [astString, setAstString] = useState("");

  return (
    <div className={MultiEditorContainer}>
      <CustomEditor
        onCodeChange={(code) => {
          convertAstString(code).then((ast) => {
            if (ast === undefined) {
              return;
            }
            setAstString(ast);
          });
        }}
      />
      <CustomViewer code={astString} />
    </div>
  );
};

export default ExplorerPage;
