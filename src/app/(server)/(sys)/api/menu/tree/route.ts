import { prisma } from "@/libs/prisma";
import checkAuthority from "@/app/(server)/(sys)/utils/checkAuthority";
import { buildError, buildSuccess } from "@/utils/response";
import { flatToTree } from "@/utils/tree";
import { SysMenuType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import apiWrapper from "@/app/(server)/(sys)/utils/apiWrapper";

async function handlerGet(req: NextRequest, res: NextResponse) {
  if (!(await checkAuthority(req, "sys:menu:list"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const menus = await prisma.sysMenu.findMany({
    where: {
      type: SysMenuType.MENU,
    },
    orderBy: {
      sort: "asc",
    },
  });
  return buildSuccess({ data: flatToTree(menus) });
}

export const GET = apiWrapper(handlerGet);
