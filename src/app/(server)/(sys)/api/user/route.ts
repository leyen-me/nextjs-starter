import { prisma } from "@/libs/prisma";
import checkAuthority from "@/app/(server)/(sys)/utils/checkAuthority";
import { buildError, buildSuccess } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";
import apiWrapper from "@/app/(server)/(sys)/utils/apiWrapper";
import { hash } from "bcrypt";

async function handlerPost(req: NextRequest, res: NextResponse) {
  if (!(await checkAuthority(req, "sys:user:add"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { roleIdList, ...data } = await req.json();
  const existingUser = await prisma.sysUser.findUnique({
    where: {
      email: data.email,
    },
  });
  if (existingUser) {
    return buildError({ message: "server.auth.register.emailAlreadyExists" });
  }
  data.password = await hash(data.password, 10);
  try {
    await prisma.$transaction(async (prisma) => {
      const user = await prisma.sysUser.create({
        data,
      });
      await prisma.sysUserRole.createMany({
        data: roleIdList.map((roleId: string) => ({
          userId: user.id,
          roleId,
        })),
      });
    });
  } catch (error) {
    console.error(error);
    return buildError({ message: "server.common.create.failed" });
  }
  return buildSuccess({ message: "server.common.create.success" });
}

export const POST = apiWrapper(handlerPost);
