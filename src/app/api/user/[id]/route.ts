import { prisma } from "@/libs/prisma";
import { encryptPassword } from "@/utils";
import { buildError, buildSuccess } from "@/utils/response";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { roleIdList, ...data } = await req.json();
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          ...data,
          password: data.password ? encryptPassword(data.password) : undefined,
        },
      });
      // 删除不在roleIdList中的roleId
      await prisma.userRole.deleteMany({
        where: {
          userId: id,
          roleId: {
            notIn: roleIdList,
          },
        },
      });
      // 添加不在userRoleIdList中的roleId
      await prisma.userRole.createMany({
        data: roleIdList.map((roleId: string) => ({
          userId: id,
          roleId,
        })),
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
  const { id } = params;
  try {
    await prisma.user.delete({
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
  const { id } = params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    user!.password = "";
    const userRoles = await prisma.userRole.findMany({
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
