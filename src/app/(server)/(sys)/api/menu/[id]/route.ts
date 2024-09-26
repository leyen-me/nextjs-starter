import { prisma } from "@/libs/prisma";
import { encryptPassword } from "@/utils";
import { checkAuthority } from "@/utils/authUtil";
import { buildError, buildSuccess } from "@/utils/response";
import { SysMenu } from "@prisma/client";

export type MenuWithChildren = SysMenu & {
  children: MenuWithChildren[];
};

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await checkAuthority("sys:menu:edit"))) {
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await checkAuthority("sys:menu:delete"))) {
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

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await checkAuthority("sys:menu:info"))) {
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