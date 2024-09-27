import { SYS_IMAGE_MAX_SIZE, SYS_IMAGE_MIME_TYPE } from "@/contants";
import { prisma } from "@/libs/prisma";
import { buildError, buildSuccess } from "@/utils/response";
import { SysImageMimeType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import apiWrapper from "@/app/(server)/(sys)/utils/apiWrapper";

async function handlerPost(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) {
    return buildError({ message: "server.common.upload.failed" });
  }
  // @ts-ignore
  const buffer = Buffer.from(await file.arrayBuffer());
  // @ts-ignore
  const mimeType = file.type;

  if (!Object.values(SYS_IMAGE_MIME_TYPE).includes(mimeType)) {
    return buildError({ message: "server.image.upload.mimeType.invalid" });
  }
  // 检查文件大小
  if (buffer.length > SYS_IMAGE_MAX_SIZE) {
    return buildError({ message: "server.image.upload.size.invalid" });
  }

  const image = await prisma.sysImage.create({
    data: {
      data: buffer,
      mimeType: Object.keys(SYS_IMAGE_MIME_TYPE).find(
        (key) =>
          SYS_IMAGE_MIME_TYPE[key as keyof typeof SYS_IMAGE_MIME_TYPE] === mimeType
      ) as SysImageMimeType,
    },
  });
  return buildSuccess({ data: image.id, message: "server.common.upload.success" });
}

export const POST = apiWrapper(handlerPost);