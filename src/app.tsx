import { MultiEditorContainer } from "./app.css";
import { CustomEditor } from "./components/CustomEditor";
import { CustomViewer } from "./components/CustomViewer";
import { CodeProvider } from "./features/code/CodeProvider";

export const App = () => {
  return (
    <CodeProvider>
      <div className={MultiEditorContainer}>
        <CustomEditor />
        <CustomViewer />
      </div>
    </CodeProvider>
  );
};
