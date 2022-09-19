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

export type CustomNode = {
  id: number;
  parentId?: number;
  type: string;
  postition: { start: number; end: number };
  specificValue?: string;
};

export const convertCustomTree = async (
  code: string,
): Promise<CustomNode[] | undefined> => {
  const [babylon, traverse] = await Promise.all([
    import("babylon"),
    import("babel-traverse"),
  ]);

  const customNodeList: CustomNode[] = [];

  try {
    const ast = babylon.parse(code);
    traverse.default(ast, {
      enter(
        nodePath: NodePath & {
          node: Node & {
            value?: unknown;
            name?: string;
            operator?: string;
          };
        },
      ) {
        const baseNode = nodePath.node;
        const parentId = customNodeList.find((node) => {
          return (
            nodePath.parent.start === node.postition.start &&
            nodePath.parent.end === node.postition.end
          );
        })?.id;

        const nodeElement: CustomNode = {
          id: customNodeList.length,
          parentId,
          type: baseNode.type,
          postition: { start: baseNode.start, end: baseNode.end },
          specificValue:
            baseNode.value !== undefined
              ? String(baseNode.value)
              : baseNode.name ?? baseNode.operator ?? undefined,
        };
        customNodeList.push(nodeElement);
      },
    });

    return customNodeList;
  } catch {
    console.info("パース失敗");
    return undefined;
  }
};
