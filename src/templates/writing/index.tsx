import { FC, useContext, useMemo } from "react";
import Link from "next/link";
import Tree from "react-d3-tree";
import { CustomEditor } from "../../components/writing/CustomEditor";
import {
  convertCustomNodeList,
  convertRawNodeDatum,
  fetchAverageDepth,
  fetchAverageStrahlerNumber,
  fetchNodeCount,
} from "../../features/code/AstUtils";
import { WritingContext } from "../../features/writing/Provider";
import { WritingTreeNodeElement } from "../../components/writing/WritingTreeNodeElement";
import { AstInfoPanel } from "../../components/writing/AstInfoPanel";
import { BackSvgIcon } from "../../components/icons/BackSvgIcon";
import { MainContainer, Header, LinkLabel, RightContainer } from "./index.css";

export const WritingPageContent: FC = () => {
  const [writingState, dispatchWriting] = useContext(WritingContext);

  // const [executeState, executeHandler] = useExecute();

  const currentPayload = useMemo(() => {
    return writingState.payload.length > 0
      ? writingState.payload.slice(-1)[0]
      : undefined;
  }, [writingState]);

  return (
    <>
      <header className={Header}>
        <Link href="/" passHref>
          <a>
            <BackSvgIcon height={32} title="back" />
          </a>
        </Link>
        <Link href="/writing/analytics" passHref>
          <a className={LinkLabel}>分析ページへ</a>
        </Link>
      </header>
      <main className={MainContainer}>
        <CustomEditor
          code={currentPayload ? currentPayload.rawProgram : undefined}
          onCodeChange={(code) => {
            const customNodeList = convertCustomNodeList(code);
            if (customNodeList === undefined) {
              return;
            }
            dispatchWriting({
              type: "UPDATE_AST",
              customNodeList,
              rawProgram: code,
            });
          }}
        />

        <div className={RightContainer}>
          {currentPayload && (
            <>
              {/* <div className={ConsoleContainer}>
                <button
                  className={ExecuteButton}
                  onClick={() => {
                    executeHandler(currentPayload.rawProgram);
                  }}
                >
                  実行
                </button>
                <p>※静的解析でエラーが発生しなかった最新のものを実行します</p>
                {executeState.status === "loading" && <p>Loading...</p>}
                {executeState.status === "success" &&
                  executeState.payload.split("\n").map((output, index) => {
                    return <p key={index}>{output}</p>;
                  })}

                {executeState.status === "error" && (
                  <p>`ERROR!! ${executeState.payload.message}`</p>
                )}
              </div> */}
              <Tree
                data={convertRawNodeDatum(currentPayload.customNodeList)}
                depthFactor={300}
                renderCustomNodeElement={(props) => {
                  return <WritingTreeNodeElement {...props} />;
                }}
                separation={{ siblings: 2, nonSiblings: 3 }}
                collapsible
              />
              <AstInfoPanel
                averageDepth={fetchAverageDepth(currentPayload.customNodeList)}
                averageStrahlerNumber={fetchAverageStrahlerNumber(
                  currentPayload.customNodeList,
                )}
                nodeCount={fetchNodeCount(currentPayload.customNodeList)}
                stepCount={writingState.payload.length}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
};
