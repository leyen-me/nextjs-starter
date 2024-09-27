import { prisma } from "@/libs/prisma";
import { buildError, buildSuccess } from "@/utils/response";
import { NextResponse } from "next/server";

// 该请求处于白名单，不用校验权限
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const image = await prisma.sysImage.findUnique({
      where: {
        id,
      },
      select: { data: true, mimeType: true }
    });
    if (!image) {
      return buildError({ message: "server.common.info.failed" });
    }
    const blob = new Blob([image.data], { type: image.mimeType });

    const headers = new Headers();
    headers.set("Content-Type", image.mimeType);
    headers.set("Content-Disposition", `inline; filename="image-${id}"`);

    return new NextResponse(blob, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return buildError({ message: "server.common.info.failed" });
  }
}
