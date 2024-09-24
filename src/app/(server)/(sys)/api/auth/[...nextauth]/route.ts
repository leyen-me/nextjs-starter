import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt"; // 用于密码比对
import { prisma } from "@/libs/prisma"; // 你的数据库连接
import { SysMenuType, SysUserStatus } from "@prisma/client";
import type { AuthOptions } from "next-auth";
import { UserInfo } from "../../user/info/route";

const findUserInfoByEmail = async (email: string) => {
  const findUserAuthority = async (userId: string) => {
    // 获取用户所有的角色列表
    const userRoles = await prisma.sysUserRole.findMany({
      where: { userId },
      select: { roleId: true },
    });
    const roleIds = userRoles.map((role) => role.roleId);
    // 获取角色所有的权限
    const roleAuthorityMenus = await prisma.sysRoleAuthorityMenu.findMany({
      where: { roleId: { in: roleIds } },
      select: { menuId: true },
    });
    // 去重
    const menuAuthorityIds = Array.from(
      new Set(roleAuthorityMenus.map((rm) => rm.menuId))
    );
    const menus = await prisma.sysMenu.findMany({
      where: { id: { in: menuAuthorityIds }, type: SysMenuType.INTERFACE },
      orderBy: { sort: "asc" },
    });

    const authorityList: string[] = [];
    menus.forEach((menu) => {
      if (menu.authority === null) {
        authorityList.push("");
      } else {
        menu.authority.split(",").forEach((authority) => {
          authorityList.push(authority);
        });
      }
    });
    return authorityList;
  };
  const user = (await prisma.sysUser.findUnique({
    where: { email },
  })) as UserInfo;
  if (user === null || user.id === undefined) {
    return null;
  }
  user.password = "";
  user.authorityList = await findUserAuthority(user.id);
  return user;
};

const clearSession = (session: Session) => {
  if (session.user) {
    session.user.email = null;
  }
  return session;
};

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // 登录页面
  pages: {
    signIn: "/login",
  },
  providers: [
    // https://github.com/settings/applications/new
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      httpOptions: {
        timeout: 50000,
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Email", type: "text" },
      },
      async authorize(credentials, req) {
        // 如果邮箱为空，返回null
        if (!credentials?.email) {
          return null;
        }

        // 从数据库中查找用户
        const user = await prisma.sysUser.findUnique({
          where: { email: credentials.email },
        });

        // 如果用户存在，比较密码
        if (user) {
          if (user.status === SysUserStatus.DISABLED) {
            return null;
          }

          const isPasswordValid = await compare(
            credentials?.password || "",
            user.password
          );

          // 如果密码不匹配，返回null
          if (!isPasswordValid) {
            return null;
          }

          // 如果密码匹配，返回用户信息
          return {
            id: user.id,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "github" || account?.provider === "google") {
        const user = await prisma.sysUser.findUnique({
          where: { email: profile?.email },
        });
        return !!user;
      }
      return true;
    },
    async session({ session, token }) {
      const user = await findUserInfoByEmail(token.email || "");
      if (!user) {
        return clearSession(session);
      }
      if (user?.status === SysUserStatus.DISABLED) {
        return clearSession(session);
      }
      return {
        ...session,
        user,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions as config };
