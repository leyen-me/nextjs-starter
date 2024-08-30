"use client";

import { AdminAuthProvider } from "./AdminAuthProvider";
import { AdminInfoProvider } from "./AdminInfoProvider";

type AdminProviderProps = {
  children: React.ReactNode;
};

export function AdminProvider({ children }: AdminProviderProps) {
  return (
    <AdminAuthProvider>
      <AdminInfoProvider>{children}</AdminInfoProvider>
    </AdminAuthProvider>
  );
}
