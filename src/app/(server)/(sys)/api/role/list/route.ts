import { prisma } from "@/libs/prisma";
import checkAuthority from "@/app/(server)/(sys)/utils/checkAuthority";
import { buildError, buildSuccess } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";
import apiWrapper from "@/app/(server)/(sys)/utils/apiWrapper";

async function handlerGet(req: NextRequest, res: NextResponse) {
  if (!(await checkAuthority(req, "sys:role:list"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const roles = await prisma.sysRole.findMany();
  return buildSuccess({ data: roles });
}

export const GET = apiWrapper(handlerGet);
