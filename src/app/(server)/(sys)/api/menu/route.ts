import { prisma } from "@/libs/prisma";
import checkAuthority from "@/app/(server)/(sys)/utils/checkAuthority";
import { buildError, buildSuccess } from "@/utils/response";
import apiWrapper from "@/app/(server)/(sys)/utils/apiWrapper";
import { NextRequest, NextResponse } from "next/server";

async function handlerPost(req: NextRequest, res: NextResponse) {
  if (!(await checkAuthority(req, "sys:menu:add"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { sort, ...data } = await req.json();
  try {
    await prisma.sysMenu.create({
      data: {
        ...data,
        sort: sort ? Number(sort) : 0,
      },
    });
  } catch (error) {
    console.error(error);
    return buildError({ message: "server.common.update.failed" });
  }
  return buildSuccess({ message: "server.common.update.success" });
}

export const POST = apiWrapper(handlerPost);
