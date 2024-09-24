import { prisma } from "@/libs/prisma";
import { checkAuthority } from "@/utils/authUtil";
import { extractFiltersWithPagination } from "@/utils/extractFilters";
import { buildError, buildSuccess } from "@/utils/response";
import { SysRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type RolePageFilters = {
  name?: string;
};

export async function GET(req: NextRequest, res: NextResponse) {
  if (!(await checkAuthority("sys:role:page"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { page, pageSize, filters } = extractFiltersWithPagination(
    req.url || "",
    ["name"]
  );

  const roles = await prisma.sysRole.findMany({
    skip: (Number(page) - 1) * Number(pageSize),
    take: Number(pageSize),
    where: filters,
  });

  const total = await prisma.sysRole.count({
    where: filters,
  });

  return buildSuccess<Page<SysRole>>({ data: { total, data: roles } });
}
