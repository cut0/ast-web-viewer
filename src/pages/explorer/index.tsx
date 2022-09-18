import { FunctionComponent } from "preact";
import { MultiEditorContainer } from "./index.css";
import { CustomEditor } from "../../components/CustomEditor";
import { CustomViewer } from "../../components/CustomViewer";
import { CodeProvider } from "../../features/code/CodeProvider";

export const ExplorerPage: FunctionComponent = () => {
  return (
    <CodeProvider>
      <div className={MultiEditorContainer}>
        <CustomEditor />
        <CustomViewer />
      </div>
    </CodeProvider>
  );
};
