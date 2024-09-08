import { TREE_ROOT_ID } from "@/contants";
import { prisma } from "@/libs/prisma";
import { buildSuccess } from "@/utils/response";
import { Menu } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type MenuWithChildren = Menu & { children: MenuWithChildren[] };

const buildTree = (menus: Menu[]): MenuWithChildren[] => {
    const menuMap = new Map<string, MenuWithChildren>();
    const tree: MenuWithChildren[] = [];

    // First, create a map of all menus
    menus.forEach(menu => {
        menuMap.set(menu.id, { ...menu, children: [] });
    });

    // Then, build the tree structure
    menus.forEach(menu => {
        const node = menuMap.get(menu.id)!;
        if (menu.pid === TREE_ROOT_ID) {
            tree.push(node);
        } else {
            const parentNode = menuMap.get(menu.pid);
            if (parentNode) {
                if (!parentNode.children) {
                    parentNode.children = [];
                }
                parentNode.children.push(node);
            }
        }
    });

    // Sort the tree and its children
    const sortTree = (nodes: MenuWithChildren[]) => {
        nodes.sort((a, b) => a.sort - b.sort);
        nodes.forEach(node => {
            if (node.children && node.children.length > 0) {
                sortTree(node.children);
            }
        });
    };

    sortTree(tree as MenuWithChildren[]);

    return tree;
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const menus = await prisma.menu.findMany({
        orderBy: {
            sort: "asc",
        },
    });
    return buildSuccess({ data: buildTree(menus) });
}
