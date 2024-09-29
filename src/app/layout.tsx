import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { I18nProvider } from "@/components/I18nProvider";
import { HtmlProvider } from "@/components/HtmlProvide";
import { SessionProvider } from "@/components/SessionProvider";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/contants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | " + SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <I18nProvider>
          <HtmlProvider>
            <body className={inter.className}>
              <AppRouterCacheProvider>
                <ToastProvider>{children}</ToastProvider>
              </AppRouterCacheProvider>
            </body>
          </HtmlProvider>
        </I18nProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
