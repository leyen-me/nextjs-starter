import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export type DictItem = {
  label: string;
  labelType: "i18n" | "text";
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
    return NextResponse.json({ error: "Config not found" }, { status: 404 });
  }
  return NextResponse.json(config.config as GlobalConfig);
}
