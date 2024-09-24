import { prisma } from "@/libs/prisma";
import { checkAuthority } from "@/utils/authUtil";
import { buildError, buildSuccess } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  if (!(await checkAuthority("sys:role:list"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const roles = await prisma.sysRole.findMany();
  return buildSuccess({ data: roles });
}
