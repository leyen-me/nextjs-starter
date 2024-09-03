import { prisma } from "@/libs/prisma";
import { Page } from "@/types";
import { extractFiltersWithPagination } from "@/utils/extractFilters";
import { Gender, User, UserStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export type UserPageFilters = {
  email?: string;
  nickname?: string;
  gender?: Gender;
  mobile?: string;
  status?: UserStatus;
};

export type UserWithoutPassword = Omit<User, "password">;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { page, pageSize, filters } = extractFiltersWithPagination(
    req.url || "",
    ["email", "nickname", "gender", "mobile", "status"]
  );

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

  return NextResponse.json<Page<UserWithoutPassword>>({ total, data: users });
}
