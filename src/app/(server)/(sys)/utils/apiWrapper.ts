import { buildError } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";
import { ResponseType } from "@/app/(server)/(sys)/types";
import { getServerSession } from "next-auth";
import { config } from "../api/auth/[...nextauth]/route";
import { SysMenuType, SysUser } from "@prisma/client";
import { RESPONSE_CODE } from "@/contants";
import { prisma } from "@/libs/prisma";

export default function apiWrapper(
  handler: (
    req: NextRequest,
    res?: NextResponse | any
  ) => Promise<NextResponse<ResponseType<any>>>
) {
  return async (req: NextRequest, res: NextResponse) => {
    try {
      // 在这里添加通用逻辑，如错误处理、身份验证等
      const session = await getServerSession(config);
      if (!session || !session.user) {
        return buildError({
          code: RESPONSE_CODE.UNAUTHORIZED,
          message: "server.auth.loginExpired",
        });
      }
      // 放入请求上下文
      req.context = req.context || {};
      try {
        const user = await prisma.sysUser.findUnique({
          where: {
            email: session.user.email,
          },
        });
        user!.password = "";
        if (!user) {
          return buildError({
            code: RESPONSE_CODE.UNAUTHORIZED,
            message: "server.auth.loginExpired",
          });
        }
        // 获取用户所有的角色列表
        const userRoles = await prisma.sysUserRole.findMany({
          where: { userId: user.id },
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
        req.context.user = {
          ...user,
          authorityList,
        };
      } catch (error) {
        return buildError({
          code: RESPONSE_CODE.UNAUTHORIZED,
          message: "server.auth.loginExpired",
        });
      }
      return await handler(req, res);
    } catch (error) {
      console.log("error", error);
      // 全局异常拦截
      return buildError({});
    }
  };
}
