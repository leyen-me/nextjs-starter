"use client";

import { SETTING_CONFIG } from "@/contants";
import { translate, getLanguage, translationsMap } from "@/i18n";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface I18nContextType {
  t: (key: string) => string;
  lang: string;
  setLang: (lang: string) => void;
}

type Translations = { [key: string]: string };

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState(SETTING_CONFIG.language);
  const [translations, setTranslations] = useState<Translations>(
    translationsMap.get(lang)
  );

  useEffect(() => {
    const savedLang =
      typeof window !== "undefined"
        ? localStorage.getItem("language") || SETTING_CONFIG.language
        : SETTING_CONFIG.language;
        
    setLang(getLanguage(savedLang));
  }, []);

  useEffect(() => {
    setTranslations(translationsMap.get(lang));
    localStorage.setItem("language", lang);
  }, [lang]);

  const t = useCallback((key: string) => {
    return translate(key, translations);
  }, [translations]);

  return (
    <I18nContext.Provider value={{ t, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
