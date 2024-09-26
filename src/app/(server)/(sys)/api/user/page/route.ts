import { prisma } from "@/libs/prisma";
import { checkAuthority, getUser } from "@/utils/authUtil";
import { extractFiltersWithPagination } from "@/utils/extractFilters";
import { Page } from "@/utils/request";
import { buildError, buildSuccess } from "@/utils/response";
import { SysUserGender, SysUser, SysUserStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type UserPageFilters = {
  email?: string;
  nickname?: string;
  gender?: SysUserGender;
  mobile?: string;
  status?: SysUserStatus;
};

export type UserWithoutPassword = Omit<SysUser, "password">;

export async function GET(req: NextRequest, res: NextResponse) {
  if (!(await checkAuthority("sys:user:page"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }

  const { page, pageSize, filters } = extractFiltersWithPagination(
    req.url || "",
    ["email", "nickname", "gender", "mobile", "status"]
  );

  const { superAdmin } = await getUser();

  // 过滤掉超级管理员
  if (!superAdmin) {
    // @ts-ignore
    filters.superAdmin = {
      not: true,
    };
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
