import { prisma } from "@/libs/prisma";
import { buildSuccess } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
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

  const menus = await prisma.menu.findMany({
    orderBy: {
      sort: "asc",
    },
    where: filters,
  });
  return buildSuccess({ data: menus });
}
