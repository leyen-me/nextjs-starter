import { prisma } from "@/libs/prisma";
import { buildError, buildSuccess } from "@/utils/response";

export async function POST(req: Request) {
  const { sort, ...data } = await req.json();
  try {
    await prisma.menu.create({
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
