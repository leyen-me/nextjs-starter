import { prisma } from "@/libs/prisma";
import { buildSuccess } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/utils/authUtil";
import { flatToTree } from "@/utils/tree";

export async function GET(req: NextRequest, res: NextResponse) {
  // 1.查询该用户所有角色的所以菜单
  const { id: userId, superAdmin } = await getUser();

  // 2.超级管理员直接返回所有菜单
  if (superAdmin) {
    const menus = await prisma.menu.findMany({
      orderBy: { sort: "asc" },
    });
    return buildSuccess({ data: flatToTree(menus) });
  }

  // 查询用户的所有角色
  const userRoles = await prisma.userRole.findMany({
    where: { userId },
    select: { roleId: true },
  });

  const roleIds = userRoles.map((role) => role.roleId);

  // 查询这些角色的所有菜单
  const roleMenus = await prisma.roleMenu.findMany({
    where: { roleId: { in: roleIds } },
    select: { menuId: true },
  });

  const menuIds = Array.from(new Set(roleMenus.map((rm) => rm.menuId)));

  // 查询去重后的菜单
  const menus = await prisma.menu.findMany({
    where: { id: { in: menuIds } },
    orderBy: { sort: "asc" },
  });

  return buildSuccess({ data: flatToTree(menus) });
}
