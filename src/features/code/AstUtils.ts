import type { Node, NodePath } from "babel-traverse";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";

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
  postition: {
    start: {
      byte: number;
      line: number;
      column: number;
    };
    end: {
      byte: number;
      line: number;
      column: number;
    };
  };
  specificValue?: string;
};

export const convertCustomNodeList = async (
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
            nodePath.parent.start === node.postition.start.byte &&
            nodePath.parent.end === node.postition.end.byte
          );
        })?.id;

        const nodeElement: CustomNode = {
          id: customNodeList.length,
          parentId,
          type: baseNode.type,
          postition: {
            start: { ...baseNode.loc.start, byte: baseNode.start },
            end: { ...baseNode.loc.end, byte: baseNode.end },
          },
          specificValue:
            baseNode.value !== undefined
              ? String(baseNode.value)
              : baseNode.name ?? baseNode.operator ?? undefined,
        };
        customNodeList.push(nodeElement);
      },
    });

    return customNodeList;
  } catch (e) {
    console.log(e);
    console.info("パース失敗");
    return undefined;
  }
};

export const convertRawNodeDatum = (nodeList: CustomNode[]) => {
  const baseNodeList: Required<RawNodeDatum>[] = nodeList.map((node) => {
    return {
      name: node.type,
      attributes: {
        id: node.id,
        parentId: node.parentId ?? "",
        value: node.specificValue ?? "",
      },
      children: [] as RawNodeDatum[],
    };
  });

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
};
