import { DefaultSession } from "next-auth";
import { SysUser, SysUserStatus, SysMenu } from "@prisma/client";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: Partial<SysUser> | undefined;
  }
}

declare module "next/server" {
  interface NextRequest {
    context: {
      user: UserInfo;
    };
  }
}
