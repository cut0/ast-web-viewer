import type { Node, NodePath } from "babel-traverse";

export const convertAstString = async (
  code: string,
): Promise<string | undefined> => {
  const babylon = await import("babylon");
  try {
    const ast = babylon.parse(code);
    const astString = JSON.stringify(ast, null, 2);
    return astString;
  } catch {
    console.info("パース失敗");
    return undefined;
  }
};

type CustomNode = {
  id: number;
  parentId?: number;
  type: string;
  postition: { start: number; end: number };
  specificValue?: string;
};

export const convertCustomTree = async (code: string) => {
  const babylon = await import("babylon");
  const traverse = (await import("babel-traverse")).default;

  const nodeList: CustomNode[] = [];

  try {
    const ast = babylon.parse(code);
    traverse(ast, {
      enter(
        nodePath: NodePath & {
          node: Node & {
            name?: string;
            value?: unknown;
            operator?: string;
          };
        },
      ) {
        const baseNode = nodePath.node;
        const parentId = nodeList.find((node) => {
          return (
            nodePath.parent.start === node.postition.start &&
            nodePath.parent.end === node.postition.end
          );
        })?.id;

        const nodeElement: CustomNode = {
          id: nodeList.length,
          parentId,
          type: baseNode.type,
          postition: { start: baseNode.start, end: baseNode.end },
          specificValue:
            baseNode.value !== undefined
              ? String(baseNode.value)
              : baseNode.name ?? baseNode.operator ?? undefined,
        };
        nodeList.push(nodeElement);
      },
    });

    return nodeList;
  } catch {
    console.info("パース失敗");
    return undefined;
  }
};
