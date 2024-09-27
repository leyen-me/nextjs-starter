import { prisma } from "@/libs/prisma";
import checkAuthority from "@/app/(server)/(sys)/utils/checkAuthority";
import { buildError, buildSuccess } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";
import apiWrapper from "@/app/(server)/(sys)/utils/apiWrapper";

async function handlerGet(req: NextRequest, res: NextResponse) {
  if (!(await checkAuthority(req, "sys:menu:list"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  // 过滤条件
  const { searchParams } = new URL(req.url || "");
  const filters: any = {};

  // 筛选url
  const url = searchParams.get("url") || "";
  if (url) {
    const decodedUrl = decodeURIComponent(url);
    filters.url = {
      contains: decodedUrl,
      mode: "insensitive",
    };
  }
  // 筛选菜单类型
  const type = searchParams.get("type") || "";
  if (type) {
    filters.type = {
      equals: type,
    };
  }

  const menus = await prisma.sysMenu.findMany({
    orderBy: {
      sort: "asc",
    },
    where: filters,
  });
  return buildSuccess({ data: menus });
}

export const GET = apiWrapper(handlerGet);
