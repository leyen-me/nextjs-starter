import { SysUser, SysUserStatus, SysMenu } from "@prisma/client";

declare module "@prisma/client" {
  export type SysMenu = SysMenu & {
    children: SysMenu[];
  };

  export type SysDetailUser = Omit<
    SysUser,
    "id" | "createdAt" | "superAdmin" | "status" | "password" | "avatar"
  >;
}
