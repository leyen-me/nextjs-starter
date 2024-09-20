import { prisma } from "@/libs/prisma";
import { buildError, buildSuccess } from "@/utils/response";
import { config } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  const session = await getServerSession(config);
  // @ts-ignore
  const id = session?.user?.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    user!.password = "";
    return buildSuccess({
      data: user,
    });
  } catch (error) {
    console.error(error);
    return buildError({ message: "server.common.info.failed" });
  }
}
