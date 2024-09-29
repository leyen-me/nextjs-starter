import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt"; // 用于密码比对
import { prisma } from "@/libs/prisma"; // 你的数据库连接
import { SysMenuType, SysUserStatus } from "@prisma/client";
import type { AuthOptions } from "next-auth";
import { UserInfo } from "../../user/info/route";
import { LOGIN_ERROR_URL, LOGIN_URL } from "@/contants";
import { SYS_AUTH_ERROR } from "@/app/(client)/(sys)/constans";

const findUserInfoByEmailAndPassword = async (
  email: string,
  password: string
) => {
  // 从数据库中查找用户
  const user = await prisma.sysUser.findUnique({
    where: { email },
  });
  // 如果用户存在，比较密码
  if (user) {
    // 如果密码不匹配，返回null
    if (!(await compare(password, user.password))) {
      return null;
    }
  }
  return user;
};

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
  if (user.superAdmin) {
    user.authorityList = [];
  } else {
    user.authorityList = await findUserAuthority(user.id);
  }
  return user;
};

const clearSession = (session: Session) => {
  if (session.user) {
    session.user = undefined;
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
    signIn: LOGIN_URL,
    error: LOGIN_ERROR_URL,
  },
  secret: process.env.NEXTAUTH_SECRET as string,
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
        if (!credentials) {
          throw new Error(SYS_AUTH_ERROR.UNKNOWN_ERROR);
        }
        // 如果邮箱为空，返回null
        if (!credentials.email) {
          throw new Error(SYS_AUTH_ERROR.ACCOUNT_NOT_EXIST);
        }
        const userInfo = await findUserInfoByEmailAndPassword(
          credentials.email,
          credentials.password
        );
        if (userInfo === null) {
          throw new Error(SYS_AUTH_ERROR.ACCOUNT_NOT_EXIST);
        }
        if (userInfo.status === SysUserStatus.DISABLED) {
          throw new Error(SYS_AUTH_ERROR.ACCOUNT_DISABLED);
        }
        return {
          id: userInfo.id,
          email: userInfo.email,
        };
      },
    }),
  ],
  callbacks: {
    /**
     * This callback is called whenever a user tries to sign in.
     * It checks if the user exists and if their account is enabled.
     * If the user is signing in with GitHub or Google, it verifies the user's email.
     * If the user does not exist or their account is disabled, it throws an error.
     * Otherwise, it allows the sign-in process to continue.
     *
     * @param {Object} params - The parameters for the signIn callback.
     * @param {Object} params.account - The account information of the user.
     * @param {Object} params.profile - The profile information of the user.
     * @returns {boolean} - Returns true if the sign-in process should continue, otherwise throws an error.
     */
    async signIn({ account, profile }) {
      if (account) {
        if (account.provider === "github" || account.provider === "google") {
          const userInfo = await findUserInfoByEmail(profile?.email || "");
          if (!userInfo) {
            throw new Error(SYS_AUTH_ERROR.ACCOUNT_NOT_EXIST);
          }
          if (userInfo.status === SysUserStatus.DISABLED) {
            throw new Error(SYS_AUTH_ERROR.ACCOUNT_DISABLED);
          }
          return !!userInfo;
        }
      } else {
        // no account
        return false;
      }
      return true;
    },
    // 无论是服务端还是客户端，都使用共同的session管理器
    // 这里相当于用户验证拦截器，基于middleware的配置文件，会拦截所有的api请求和admin路由，当然会有白名单
    async session({ session, token }) {
      try {
        const userInfo = await findUserInfoByEmail(token.email || "");
        // 用户未注册，或者用户已被注销，获取用户已被禁用
        if (!userInfo) {
          return {
            ...clearSession(session),
          };
        }
        return {
          ...session,
          user: userInfo,
        };
      } catch (error) {
        // 数据库连接错误
        return {
          ...clearSession(session),
        };
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions as config };
