import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt"; // 用于密码比对
import { prisma } from "@/libs/prisma"; // 你的数据库连接
import { SysUserStatus } from "@prisma/client";
import type { AuthOptions } from "next-auth";
import { LOGIN_ERROR_URL, LOGIN_URL } from "@/contants";
import { SYS_AUTH_ERROR } from "@/app/(client)/(sys)/constans";

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
        return {
          id: "",
          email: credentials?.email,
          password: credentials?.password,
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
     * @param {Object} params.user - The user information.
     * @param {Object} params.account - The account information of the user.
     * @param {Object} params.profile - The profile information of the user.
     * @returns {boolean} - Returns true if the sign-in process should continue, otherwise throws an error.
     */
    async signIn({ user, account, profile }) {
      const email = user.email || "";
      // @ts-ignore
      const password = user.password || "";
      const userInfo = await prisma.sysUser.findUnique({
        where: { email },
      });
      if (userInfo === null || userInfo.id === undefined) {
        throw new Error(SYS_AUTH_ERROR.ACCOUNT_NOT_EXIST);
      }
      if (password) {
        if (!(await compare(password, userInfo.password))) {
          throw new Error(SYS_AUTH_ERROR.PASSWORD_NOT_MATCH);
        }
      }
      if (userInfo.status === SysUserStatus.DISABLED) {
        throw new Error(SYS_AUTH_ERROR.ACCOUNT_DISABLED);
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions as config };
