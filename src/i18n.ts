import { LANGUAGES, SETTING_CONFIG } from "./contants";
import en from "./locales/en";
import zhCN from "./locales/zh-CN";

export const translationsMap = new Map<string, any>();
translationsMap.set(LANGUAGES[0].value, zhCN);
translationsMap.set(LANGUAGES[1].value, en);

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

export const getLanguage = (lang: string): string => {
  return translationsMap.has(lang) ? lang : SETTING_CONFIG.language;
};
