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
  specificValue?: string;
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
    baseNodeList.map((node) => {
      if (node.attributes.id !== targetNode.attributes.parentId) {
        return node;
      }
      node.children.push(targetNode);
      return node;
    });
  }
};

export const getNodeDistance = (
  customNodeList: CustomNode[],
  idA: number,
  idB: number,
) => {
  const targetA = customNodeList.find((node) => {
    return node.id === idA;
  });

  const targetB = customNodeList.find((node) => {
    return node.id === idB;
  });

  if (targetA === undefined || targetB === undefined) {
    return -1;
  }

  const targetAToRootDistanceList = [
    ...Array.from({ length: customNodeList.length }),
  ].map(() => {
    return -1;
  });

  const currentFromA = {
    pos: targetA.id,
    distance: 0,
    parentPos: targetA.parentId,
  };
  while (true) {
    targetAToRootDistanceList[currentFromA.pos] = currentFromA.distance;
    if (currentFromA.parentPos === undefined) {
      break;
    }
    currentFromA.pos = currentFromA.parentPos;
    currentFromA.parentPos = customNodeList.find((node) => {
      return node.id === currentFromA.pos;
    })?.id;
    currentFromA.distance += 1;
  }

  const currentFromB = {
    pos: targetB.id,
    distance: 0,
    parentPos: targetB.parentId,
  };
  while (true) {
    if (
      currentFromB.parentPos === undefined ||
      targetAToRootDistanceList[currentFromB.pos] !== -1
    ) {
      break;
    }
    currentFromB.pos = currentFromB.parentPos;
    currentFromB.parentPos = customNodeList.find((node) => {
      return node.id === currentFromB.pos;
    })?.id;
    currentFromB.distance += 1;
  }

  return targetAToRootDistanceList[currentFromB.pos] + currentFromB.distance;
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
