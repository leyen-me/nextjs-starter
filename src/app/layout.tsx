import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/components/auth/AuthSessionProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

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
      <html lang="en">
        <body className={inter.className}>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </body>
      </html>
    </AuthSessionProvider>
  );
}
