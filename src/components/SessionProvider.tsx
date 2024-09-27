"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

type AuthSessionProviderProps = {
  children: React.ReactNode;
};

export function SessionProvider({ children }: AuthSessionProviderProps) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
