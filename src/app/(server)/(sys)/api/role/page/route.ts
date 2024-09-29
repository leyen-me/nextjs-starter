import { prisma } from "@/libs/prisma";
import checkAuthority from "@/app/(server)/(sys)/utils/checkAuthority";
import { Page } from "@/utils/request";
import { buildError, buildSuccess } from "@/utils/response";
import { SysRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import apiWrapper from "@/app/(server)/(sys)/utils/apiWrapper";
import { getParams } from "@/utils/params";

async function handlerGet(req: NextRequest, res: NextResponse) {
  if (!(await checkAuthority(req, "sys:role:page"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { page, pageSize, ...filters } = getParams(req);

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

export const GET = apiWrapper(handlerGet);
