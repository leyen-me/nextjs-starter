import { prisma } from "@/libs/prisma";
import { encryptPassword } from "@/utils";
import { checkAuthority } from "@/utils/authUtil";
import { buildError, buildSuccess } from "@/utils/response";

export async function POST(req: Request) {
  if (!(await checkAuthority("sys:user:add"))) {
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
  data.password = encryptPassword(data.password);
  try {
    await prisma.$transaction(async (prisma) => {
      const user = await prisma.sysUser.create({
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
