"use client";

import { SETTING_CONFIG } from "@/contants";
import { useEffect, useState } from "react";
import { useI18n } from "./I18nProvider";

export function HtmlProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState(SETTING_CONFIG.language);
  const { lang: savedLang } = useI18n();

  useEffect(() => {
    setLang(savedLang);
  }, [savedLang]);

  return <html lang={lang}>
    <head>
      <link
        rel="icon"
        href="/favicon-light.svg"
        type="image/svg+xml"
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="icon"
        href="/favicon-dark.svg"
        type="image/svg+xml"
        media="(prefers-color-scheme: dark)"
      />
    </head>
    {children}
  </html>;
}
