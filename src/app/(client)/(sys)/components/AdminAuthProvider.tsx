import { ACCOUNT_CLOSED_URL, ACCOUNT_DEACTIVATED_URL } from "@/contants";
import { SysUserStatus } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";

type AdminAuthProviderProps = {
  children: React.ReactNode;
};

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const { data: session, status } = useSession();

  // 用户认证拦截器
  if (status === "authenticated") {
    if (!session.user) {
      signOut({ callbackUrl: ACCOUNT_CLOSED_URL, redirect: true });
    } else {
      if (session.user.status === SysUserStatus.DISABLED) {
        signOut({ callbackUrl: ACCOUNT_DEACTIVATED_URL, redirect: true });
      }
    }
  }
  return <>{children}</>;
}
