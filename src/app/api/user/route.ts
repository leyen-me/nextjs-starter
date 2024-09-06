import { prisma } from "@/libs/prisma";
import { encryptPassword } from "@/utils";
import { buildError, buildSuccess } from "@/utils/response";

export async function POST(req: Request) {
  const { roleIdList, ...data } = await req.json();
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (existingUser) {
    return buildError({ message: "server.auth.register.emailAlreadyExists" });
  }
  data.password = encryptPassword(data.password);
  try {
    await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data,
      });
      await prisma.userRole.createMany({
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
