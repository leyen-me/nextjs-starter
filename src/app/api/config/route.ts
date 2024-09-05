import { LabelType } from "@/contants";
import { prisma } from "@/libs/prisma";
import { buildError, buildSuccess } from "@/utils/response";
import { NextRequest } from "next/server";

export type DictItem = {
  label: string;
  labelType: LabelType;
  value: string;
  color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
};

export type DictMap = {
  [key: string]: {
    type: "dict";
    data: DictItem[];
  };
};

export type GlobalConfig = {
  dictMap: DictMap
};

export async function GET(request: NextRequest) {
  const config = await prisma.globalConfig.findFirst();
  if (!config) {
    return buildError({ message: "server.config.notFound" });
  }
  return buildSuccess({ data: config.config as GlobalConfig });
}
