import { prisma } from "@/libs/prisma";
import { buildError, buildSuccess } from "@/utils/response";
import { config } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { SysMenuType, SysUser } from "@prisma/client";
import apiWrapper from "@/app/(server)/(sys)/utils/apiWrapper";
import { NextRequest, NextResponse } from "next/server";
type StorePartialUser = Partial<SysUser>;

export type UserInfo = StorePartialUser & {
  authorityList: string[];
};

async function handlerGet(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(config);
  // @ts-ignore
  const userId = session?.user?.id;

  
  try {
    const user = await prisma.sysUser.findUnique({
      where: {
        id: userId,
      },
    });
    user!.password = "";

    // 获取用户所有的角色列表
    const userRoles = await prisma.sysUserRole.findMany({
      where: { userId },
      select: { roleId: true },
    });
    const roleIds = userRoles.map((role) => role.roleId);
    // 获取角色所有的权限
    const roleAuthorityMenus = await prisma.sysRoleAuthorityMenu.findMany({
      where: { roleId: { in: roleIds } },
      select: { menuId: true },
    });
    // 去重
    const menuAuthorityIds = Array.from(
      new Set(roleAuthorityMenus.map((rm) => rm.menuId))
    );
    const menus = await prisma.sysMenu.findMany({
      where: { id: { in: menuAuthorityIds }, type: SysMenuType.INTERFACE },
      orderBy: { sort: "asc" },
    });
    const authorityList = menus.map((menu) => menu.authority);

    return buildSuccess({
      data: {
        ...user,
        authorityList,
      },
    });
  } catch (error) {
    console.error(error);
    return buildError({ message: "server.common.info.failed" });
  }
}

export const GET = apiWrapper(handlerGet);
