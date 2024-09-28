import { prisma } from "@/libs/prisma";
import checkAuthority from "@/app/(server)/(sys)/utils/checkAuthority";
import { buildError, buildSuccess } from "@/utils/response";
import apiWrapper from "@/app/(server)/(sys)/utils/apiWrapper";
import { NextRequest } from "next/server";

async function handlerPut(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await checkAuthority(req, "sys:menu:edit"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { id } = params;
  const { sort, ...data } = await req.json();
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.sysMenu.update({
        where: {
          id,
        },
        data: {
          ...data,
          sort: Number(sort),
        },
      });
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
  if (!(await checkAuthority(req, "sys:menu:delete"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { id } = params;
  try {
    await prisma.sysMenu.delete({
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
  if (!(await checkAuthority(req, "sys:menu:info"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { id } = params;
  try {
    const menus = await prisma.sysMenu.findUnique({
      where: {
        id,
      },
    });
    return buildSuccess({
      data: menus,
    });
  } catch (error) {
    console.error(error);
    return buildError({ message: "server.common.info.failed" });
  }
}

export const PUT = apiWrapper(handlerPut);
export const DELETE = apiWrapper(handlerDelete);
export const GET = apiWrapper(handlerGet);
