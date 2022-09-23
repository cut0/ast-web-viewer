import { FC, useContext, useMemo } from "react";
import Tree from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import Link from "next/link";
import { ExplorerCodeContext } from "../../../features/explorer/CodeProvider";
import { PageContainer, TreeContainer, LinkText } from "./analytics.css";

export const ExplorerAnalyticsPageContent: FC = () => {
  const [nodeList] = useContext(ExplorerCodeContext);
  const rawNodeDatum: RawNodeDatum | undefined = useMemo(() => {
    const baseNodeList: Required<RawNodeDatum>[] = nodeList.payload.map(
      (node) => {
        return {
          name: node.type,
          attributes: {
            id: node.id,
            parentId: node.parentId ?? "",
            value: node.specificValue ?? "",
          },
          children: [] as RawNodeDatum[],
        };
      },
    );

    while (true) {
      const targetNode = baseNodeList.pop();
      if (targetNode === undefined || targetNode.attributes.parentId === "") {
        return targetNode;
      }
      baseNodeList.map((node) => {
        if (node.attributes.id !== targetNode.attributes.parentId) {
          return node;
        }
        node.children.push(targetNode);
        return node;
      });
    }
  }, [nodeList]);

  return (
    <>
      {rawNodeDatum === undefined ? (
        <div className={PageContainer}>
          <p>
            データがありません。 探索ページに
            <Link href="/explorer" passHref>
              <a className={LinkText}>戻る</a>
            </Link>
          </p>
        </div>
      ) : (
        <div className={TreeContainer}>
          <Tree data={rawNodeDatum} />
        </div>
      )}
    </>
  );
};
