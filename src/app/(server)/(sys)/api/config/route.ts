import { LabelType } from "@/contants";
import { prisma } from "@/libs/prisma";
import { checkAuthority } from "@/utils/authUtil";
import { buildError, buildSuccess } from "@/utils/response";
import { NextRequest } from "next/server";

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

export async function GET(request: NextRequest) {
  const config = await prisma.sysConfig.findFirst();
  if (!config) {
    return buildError({ message: "server.config.notFound" });
  }
  return buildSuccess({ data: config.config as GlobalConfig });
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuthority("sys:config:edit"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const config = await request.json();
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
