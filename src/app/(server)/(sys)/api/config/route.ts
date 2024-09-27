import { prisma } from "@/libs/prisma";
import checkAuthority from "@/app/(server)/(sys)/utils/checkAuthority";
import { buildError, buildSuccess } from "@/utils/response";
import { LabelType } from "@prisma/client";
import { NextRequest } from "next/server";
import apiWrapper from "@/app/(server)/(sys)/utils/apiWrapper";

export type DictItem = {
  label: string;
  labelType: LabelType;
  value: string;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
};

export type DictMap = {
  [key: string]: {
    type: "dict";
    data: DictItem[];
  };
};

export type GlobalConfig = {
  dictMap: DictMap;
};

async function handlerGet(request: NextRequest) {
  const config = await prisma.sysConfig.findFirst();
  if (!config) {
    return buildError({ message: "server.config.notFound" });
  }
  return buildSuccess({ data: config.config as GlobalConfig });
}

async function handlerPut(req: NextRequest) {
  if (!(await checkAuthority(req, "sys:config:edit"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const config = await req.json();
  const existingConfig = await prisma.sysConfig.findFirst();
  if (existingConfig) {
    await prisma.sysConfig.update({
      where: { id: existingConfig.id },
      data: { config },
    });
  } else {
    return buildError({ message: "server.common.update.failed" });
  }
  return buildSuccess({
    data: config,
    message: "server.common.update.success",
  });
}

export const GET = apiWrapper(handlerGet);
export const PUT = apiWrapper(handlerPut);
