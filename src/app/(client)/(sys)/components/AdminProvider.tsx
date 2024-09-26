"use client";

import { AdminAuthProvider } from "./AdminAuthProvider";
import { AdminInfoProvider } from "./AdminInfoProvider";
import { LicenseInfo } from "@mui/x-license";

type AdminProviderProps = {
  children: React.ReactNode;
};

LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_X_LICENSE_KEY as string);

export function AdminProvider({ children }: AdminProviderProps) {
  return (
    <AdminAuthProvider>
      <AdminInfoProvider>{children}</AdminInfoProvider>
    </AdminAuthProvider>
  );
}
