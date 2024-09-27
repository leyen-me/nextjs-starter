import { prisma } from "@/libs/prisma";
import checkAuthority from "@/app/(server)/(sys)/utils/checkAuthority";
import { updateManyToManyRelation } from "@/utils/relation";
import { buildError, buildSuccess } from "@/utils/response";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import apiWrapper from "@/app/(server)/(sys)/utils/apiWrapper";

async function handlerPut(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await checkAuthority(req, "sys:user:edit"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { id } = params;
  const { roleIdList, authorityMenuIdList, ...data } = await req.json();
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.sysUser.update({
        where: {
          id,
        },
        data: {
          ...data,
          password: data.password ? await hash(data.password, 10) : undefined,
        },
      });
      // Update user-role relation
      if (roleIdList) {
        await updateManyToManyRelation(prisma, {
          parentId: id,
          newChildIds: roleIdList,
          relationModel: prisma.sysUserRole,
          parentIdField: "userId",
          childIdField: "roleId",
        });
      }
    });
  } catch (error) {
    console.error(error);
    return buildError({ message: "server.common.update.failed" });
  }
  return buildSuccess({ message: "server.common.update.success" });
}

async function handlerDelete(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await checkAuthority(req, "sys:user:delete"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { id } = params;
  try {
    await prisma.sysUser.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    return buildError({ message: "server.common.delete.failed" });
  }
  return buildSuccess({ message: "server.common.delete.success" });
}

async function handlerGet(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await checkAuthority(req, "sys:user:[id]"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { id } = params;
  try {
    const user = await prisma.sysUser.findUnique({
      where: {
        id,
      },
    });
    user!.password = "";
    const userRoles = await prisma.sysUserRole.findMany({
      where: {
        userId: id,
      },
    });
    return buildSuccess({
      data: {
        ...user,
        roleIdList: userRoles.map((userRole) => userRole.roleId),
      },
    });
  } catch (error) {
    console.error(error);
    return buildError({ message: "server.common.info.failed" });
  }
}

export const PUT = apiWrapper(handlerPut);
export const DELETE = apiWrapper(handlerDelete);
export const GET = apiWrapper(handlerGet);
