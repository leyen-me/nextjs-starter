import { prisma } from "@/libs/prisma";
import { Page } from "@/utils/request";
import { buildError, buildSuccess } from "@/utils/response";
import { SysUser } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import apiWrapper from "@/app/(server)/(sys)/utils/apiWrapper";
import checkAuthority from "@/app/(server)/(sys)/utils/checkAuthority";
import { getParams } from "@/utils/params";

export type UserWithoutPassword = Omit<SysUser, "password">;

async function handlerGet(req: NextRequest, res: NextResponse) {
  if (!(await checkAuthority(req, "sys:user:page"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { page, pageSize, ...filters } = getParams(req);
  const { superAdmin } = req.context.user;

  // 不能让普通用户看到超级管理员，数据权限
  if (!superAdmin) {
    filters.superAdmin = { not: true } as any;
  }

  const dbUsers = await prisma.sysUser.findMany({
    skip: (Number(page) - 1) * Number(pageSize),
    take: Number(pageSize),
    where: filters,
  });

  const total = await prisma.sysUser.count({
    where: filters,
  });

  const users = dbUsers.map((user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  return buildSuccess<Page<UserWithoutPassword>>({
    data: { total, data: users },
  });
}

export const GET = apiWrapper(handlerGet);
