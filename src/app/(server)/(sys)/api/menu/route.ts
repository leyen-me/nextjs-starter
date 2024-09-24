import { prisma } from "@/libs/prisma";
import { checkAuthority } from "@/utils/authUtil";
import { buildError, buildSuccess } from "@/utils/response";

export async function POST(req: Request) {
  if (!(await checkAuthority("sys:menu:add"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { sort, ...data } = await req.json();
  try {
    await prisma.sysMenu.create({
      data: {
        ...data,
        sort: sort ? Number(sort) : 0,
      },
    });
  } catch (error) {
    console.error(error);
    return buildError({ message: "server.common.update.failed" });
  }
  return buildSuccess({ message: "server.common.update.success" });
}
