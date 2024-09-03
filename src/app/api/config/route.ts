import { getServerLanguage } from "@/i18n";
import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export type GlobalConfig = {
  siteName: string;
};

const DB_LANGUAGE_ENUM = {
  "zh-CN": "ZH",
  en: "EN",
};

export async function GET(request: NextRequest) {
  const lang = getServerLanguage(request);
  const config = await prisma.globalConfig.findFirst({
    where: {
      // @ts-ignore
      language: DB_LANGUAGE_ENUM[lang],
    },
  });
  if (!config) {
    return NextResponse.json({ error: "Config not found" }, { status: 404 });
  }
  return NextResponse.json(config.config as GlobalConfig);
}
