import { TREE_ROOT_ID } from "@/contants";

// 树转Map
export const treeToMap = <T extends { id: string; children: T[] }>(
  tree: T[]
): Map<string, T> => {
  const map = new Map();
  const stack = [...tree];
  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      continue;
    }
    map.set(node.id, node);
    if (node.children) {
      stack.push(...node.children);
    }
  }
  return map;
};

// 扁平转树
export const flatToTree = <
  T extends { id: string; pid: string; sort?: number; children?: T[] }
>(
  flat: T[]
) => {
  const map = new Map();
  const tree: T[] = [];

  // Sort the flat array first, considering both top-level and internal sorting
  const sortedFlat = flat.sort((a, b) => {
    // First, compare by parent ID to group items
    if (a.pid !== b.pid) {
      return (a.pid || "").localeCompare(b.pid || "");
    }
    // Then, sort by the 'sort' property within each group
    return (a.sort || 0) - (b.sort || 0);
  });

  sortedFlat.forEach((item) => {
    map.set(item.id, item);
    if (!item.children) {
      item.children = [];
    }
  });

  sortedFlat.forEach((item) => {
    if (item.pid === TREE_ROOT_ID) {
      tree.push(item);
    } else {
      const parent = map.get(item.pid);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(item);
      }
    }
  });

  return tree;
};
