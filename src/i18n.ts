import { NextRequest } from "next/server";
import en from "./locales/en";
import zh from "./locales/zh-CN";
import { SETTING_CONFIG } from "./contants";

export const translationsMap = new Map<string, any>();
translationsMap.set("en", en);
translationsMap.set(SETTING_CONFIG.language, zh);

export const translate = (key: string, translations: any): string => {
  const keys = key.split(".");
  let value: any = translations;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return key; // Return the original key if the path is not found
    }
  }

  return typeof value === "string" ? value : key;
};

export const getServerLanguage = (request: NextRequest): string => {
  return getLanguage(request.headers.get("X-Language") || "");
};

export const serverTranslate = (key: string, request: NextRequest): string => {
  const lang = getLanguage(request.headers.get("X-Language") || "");
  const translations = translationsMap.get(lang);
  return translations ? translate(key, translations) : key;
};

export const clientTranslate = (key: string, translations: any): string => {
  return translate(key, translations);
};

export const getLanguage = (lang: string): string => {
  return translationsMap.has(lang) ? lang : SETTING_CONFIG.language;
};
