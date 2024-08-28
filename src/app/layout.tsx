import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/components/auth/AuthSessionProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { I18nProvider } from "@/components/I18nProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Next.js Admin",
    template: "%s | Next.js Admin",
  },
  description: "Next.js Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthSessionProvider>
      <I18nProvider>
        <html lang="zh-CN">
          <body className={inter.className}>
            <AppRouterCacheProvider>
              <ThemeProvider>
                <ToastProvider>{children}</ToastProvider>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </body>
        </html>
      </I18nProvider>
    </AuthSessionProvider>
  );
}
