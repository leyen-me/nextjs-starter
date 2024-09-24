import { prisma } from "@/libs/prisma";
import { checkAuthority } from "@/utils/authUtil";
import { buildError, buildSuccess } from "@/utils/response";
import { flatToTree } from "@/utils/tree";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  if (!(await checkAuthority("sys:menu:list"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const menus = await prisma.sysMenu.findMany({
    orderBy: {
      sort: "asc",
    },
  });
  return buildSuccess({ data: flatToTree(menus) });
}
