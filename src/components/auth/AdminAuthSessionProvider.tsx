"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

type AdminAuthSessionProviderProps = {
  children: React.ReactNode;
};

export function AdminAuthSessionProvider({
  children,
}: AdminAuthSessionProviderProps) {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      const email = session?.user?.email;
      if (!email) {
        signOut();
      }
    }
  }, [status, session]);
  return <>{children}</>;
}
