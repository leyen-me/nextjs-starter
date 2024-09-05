import { prisma } from "@/libs/prisma";
import { encryptPassword } from "@/utils";
import { buildError, buildSuccess } from "@/utils/response";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await req.json();
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        password: data.password ? encryptPassword(data.password) : undefined,
      },
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
    if (user) {
      user.password = "";
    }
    return buildSuccess({ data: user });
  } catch (error) {
    console.error(error);
    return buildError({ message: "server.common.info.failed" });
  }
}