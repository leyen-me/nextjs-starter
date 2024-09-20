import { prisma } from "@/libs/prisma";
import { getUser } from "@/utils/authUtil";
import { extractFiltersWithPagination } from "@/utils/extractFilters";
import { buildSuccess } from "@/utils/response";
import { Gender, User, UserStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type UserPageFilters = {
  email?: string;
  nickname?: string;
  gender?: Gender;
  mobile?: string;
  status?: UserStatus;
};

export type UserWithoutPassword = Omit<User, "password">;

export async function GET(req: NextRequest, res: NextResponse) {
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

  const dbUsers = await prisma.user.findMany({
    skip: (Number(page) - 1) * Number(pageSize),
    take: Number(pageSize),
    where: filters,
  });

  const total = await prisma.user.count({
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
