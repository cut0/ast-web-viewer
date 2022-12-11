import type { Node, NodePath } from "babel-traverse";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import * as babylon from "babylon";
import traverse from "babel-traverse";

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
  depth: number;
  specificValue?: string;
  childrenIds: number[];
  strahlerNumber?: number;
};

const extendStrahlerNumber = (customNodeList: CustomNode[]) => {
  const stack = customNodeList.filter((node) => {
    return node.childrenIds.length === 0;
  });

  stack.forEach((node) => {
    customNodeList[node.id].strahlerNumber = 1;
  });

  while (true) {
    if (stack.length === 0) {
      break;
    }
    const targetNode = stack.shift();
    if (targetNode === undefined) {
      break;
    }

    const parentNode = customNodeList.find((node) => {
      return node.id === targetNode.parentId;
    });
    if (parentNode === undefined) {
      break;
    }

    const brotherNodeStrahlerNumberList = customNodeList
      .filter((node) => {
        return parentNode.childrenIds.includes(node.id);
      })
      .map((node) => {
        return node.strahlerNumber;
      });

    if (!brotherNodeStrahlerNumberList.includes(undefined)) {
      const maxStrahlerNumber = Math.max(
        ...(brotherNodeStrahlerNumberList as number[]),
      );
      if (
        brotherNodeStrahlerNumberList.filter((strahlerNumber) => {
          return strahlerNumber === maxStrahlerNumber;
        }).length === 1
      ) {
        parentNode.strahlerNumber = maxStrahlerNumber;
      } else {
        parentNode.strahlerNumber = maxStrahlerNumber + 1;
      }
      customNodeList[parentNode.id] = parentNode;
      stack.push(parentNode);
    } else {
      stack.push(targetNode);
    }
  }
  return customNodeList;
};

export const convertCustomNodeList = (
  code: string,
): CustomNode[] | undefined => {
  const customNodeList: CustomNode[] = [];

  try {
    const ast = babylon.parse(code);
    traverse(ast, {
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
        const id = customNodeList.length;
        const parentNode = customNodeList.find((node) => {
          return (
            nodePath.parent.start === node.postition.start.byte &&
            nodePath.parent.end === node.postition.end.byte
          );
        });

        if (parentNode) {
          parentNode.childrenIds.push(id);
          customNodeList[parentNode.id] = parentNode;
        }

        const nodeElement: CustomNode = {
          id,
          parentId: parentNode?.id,
          type: baseNode.type,
          postition: {
            start: { ...baseNode.loc.start, byte: baseNode.start },
            end: { ...baseNode.loc.end, byte: baseNode.end },
          },
          specificValue:
            baseNode.value !== undefined
              ? String(baseNode.value)
              : baseNode.name ?? baseNode.operator ?? undefined,
          childrenIds: [],
          strahlerNumber: undefined,
          depth: parentNode ? parentNode.depth + 1 : 1,
        };
        customNodeList.push(nodeElement);
      },
    });

    return extendStrahlerNumber(customNodeList);
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
        strahlerNumber: node.strahlerNumber ?? "",
        depth: node.depth ?? "",
        startLine: String(node.postition.start.line),
        startColumn: String(node.postition.start.column),
        endLine: String(node.postition.end.line),
        endColumn: String(node.postition.end.column),
        value: node.specificValue ?? "",
      },
      children: [] as Required<RawNodeDatum>[],
    };
  });

  while (true) {
    const targetNode = baseNodeList.pop();
    if (targetNode === undefined || targetNode.attributes.parentId === "") {
      return targetNode;
    }
    baseNodeList.map((parentNode) => {
      if (parentNode.attributes.id !== targetNode.attributes.parentId) {
        return parentNode;
      }
      parentNode.children.push(targetNode);
      return parentNode;
    });
  }
};

export const getCustomNodeFromPostion = (
  customNodeList: CustomNode[],
  postition: {
    start: {
      line: number;
      column: number;
    };
    end: {
      line: number;
      column: number;
    };
  },
): CustomNode | undefined => {
  const customNode = customNodeList.find((node) => {
    return (
      node.postition.start.line === postition.start.line &&
      node.postition.start.column === postition.start.column &&
      node.postition.end.line === postition.end.line &&
      node.postition.end.column === postition.end.column
    );
  });
  return customNode;
};

export const fetchNodeCount = (customNodeList: CustomNode[]) => {
  return customNodeList.length;
};

export const fetchAverageStrahlerNumber = (customNodeList: CustomNode[]) => {
  let total = 0;
  customNodeList.forEach((customNode) => {
    total += customNode.strahlerNumber ?? 0;
  });
  return total / fetchNodeCount(customNodeList);
};

export const fetchAverageDepth = (customNodeList: CustomNode[]) => {
  let total = 0;
  customNodeList.forEach((customNode) => {
    total += customNode.depth;
  });
  return total / fetchNodeCount(customNodeList);
};
