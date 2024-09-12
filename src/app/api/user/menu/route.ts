import { prisma } from "@/libs/prisma";
import { buildSuccess } from "@/utils/response";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserId } from "@/utils/authUtil";
import { flatToTree } from "@/utils/tree";

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  // 1.查询该用户所有角色的所以菜单
  const userId = await getUserId();

  // 查询用户的所有角色
  const userRoles = await prisma.userRole.findMany({
    where: { userId },
    select: { roleId: true }
  });

  const roleIds = userRoles.map(role => role.roleId);

  // 查询这些角色的所有菜单
  const roleMenus = await prisma.roleMenu.findMany({
    where: { roleId: { in: roleIds } },
    select: { menuId: true }
  });

  const menuIds = Array.from(new Set(roleMenus.map(rm => rm.menuId)));

  // 查询去重后的菜单
  const menus = await prisma.menu.findMany({
    where: { id: { in: menuIds } },
    orderBy: { sort: 'asc' }
  });

  return buildSuccess({ data: flatToTree(menus) });
}
