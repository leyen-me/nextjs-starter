import { prisma } from "@/libs/prisma";
import { checkAuthority } from "@/utils/authUtil";
import { buildError, buildSuccess } from "@/utils/response";

export async function POST(req: Request) {
  if (!(await checkAuthority("sys:role:add"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const data = await req.json();
  const existingRole = await prisma.role.findUnique({
    where: {
      name: data.name,
    },
  });
  if (existingRole) {
    return buildError({ message: "server.role.create.nameAlreadyExists" });
  }
  try {
    await prisma.role.create({
      data,
    });
  } catch (error) {
    console.error(error);
    return buildError({ message: "server.common.create.failed" });
  }
  return buildSuccess({ message: "server.common.create.success" });
}
