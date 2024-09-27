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
      signOut({ callbackUrl: "/account-closed", redirect: true });
    } else {
      if (session.user.status === SysUserStatus.DISABLED) {
        signOut({ callbackUrl: "/account-disabled", redirect: true });
      }
    }
  }
  return <>{children}</>;
}
