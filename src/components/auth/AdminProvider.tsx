"use client";

import { AdminAuthProvider } from "./AdminAuthProvider";
import { AdminInfoProvider } from "./AdminInfoProvider";
import { LicenseInfo } from '@mui/x-license';

type AdminProviderProps = {
  children: React.ReactNode;
};

LicenseInfo.setLicenseKey("e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y");

export function AdminProvider({ children }: AdminProviderProps) {
  return (
    <AdminAuthProvider>
      <AdminInfoProvider>{children}</AdminInfoProvider>
    </AdminAuthProvider>
  );
}
