import { prisma } from "@/libs/prisma";
import checkAuthority from "@/app/(server)/(sys)/utils/checkAuthority";
import { buildError, buildSuccess } from "@/utils/response";
import apiWrapper from "@/app/(server)/(sys)/utils/apiWrapper";
import { NextRequest, NextResponse } from "next/server";

export async function handlerPost(req: NextRequest, res: NextResponse) {
  if (!(await checkAuthority(req, "sys:role:add"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const data = await req.json();
  const existingRole = await prisma.sysRole.findUnique({
    where: {
      name: data.name,
    },
  });
  if (existingRole) {
    return buildError({ message: "server.role.create.nameAlreadyExists" });
  }
  try {
    await prisma.sysRole.create({
      data,
    });
  } catch (error) {
    console.error(error);
    return buildError({ message: "server.common.create.failed" });
  }
  return buildSuccess({ message: "server.common.create.success" });
}

export const POST = apiWrapper(handlerPost);
