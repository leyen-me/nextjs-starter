import { LANGUAGES, SETTING_CONFIG } from "./contants";

export const translationsMap = new Map<string, any>();

LANGUAGES.forEach((lang) => {
  import(`./locales/${lang.value}.ts`).then((res) => {
    translationsMap.set(lang.value, res.default);
  });
});

export const translate = (key: string, translations: any): string => {
  // server component
  if (typeof window == "undefined") {
    return key;
  } else {
    // client component
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
  }
};

export const getLanguage = (lang: string): string => {
  return translationsMap.has(lang) ? lang : SETTING_CONFIG.language;
};
