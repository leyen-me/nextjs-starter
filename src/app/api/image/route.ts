import { IMAGE_MIME_TYPE } from "@/contants";
import { prisma } from "@/libs/prisma";
import { buildError, buildSuccess } from "@/utils/response";
import { ImageMimeType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) {
    return buildError({ message: "server.common.upload.failed" });
  }
  // @ts-ignore
  const buffer = Buffer.from(await file.arrayBuffer());
  // @ts-ignore
  const mimeType = file.type;

  if (!Object.values(IMAGE_MIME_TYPE).includes(mimeType)) {
    return buildError({ message: "server.image.upload.mimeType.invalid" });
  }

  const image = await prisma.image.create({
    data: {
      data: buffer,
      mimeType: Object.keys(IMAGE_MIME_TYPE).find(
        (key) =>
          IMAGE_MIME_TYPE[key as keyof typeof IMAGE_MIME_TYPE] === mimeType
      ) as ImageMimeType,
    },
  });
  return buildSuccess({ data: image.id, message: "server.common.upload.success" });
}
