import NextAuth, { RequestInternal, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt"; // 用于密码比对
import { prisma } from "@/libs/prisma"; // 你的数据库连接
import { UserStatus } from "@prisma/client";
import { signOut } from "next-auth/react";

const handler = NextAuth({
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
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // 如果用户存在，比较密码
        if (user) {
          if (user.status === UserStatus.DISABLED) {
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
        const user = await prisma.user.findUnique({
          where: { email: profile?.email },
        });
        return !!user;
      }
      return true;
    },
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: { email: token.email || "" },
      });
      if (user?.status === UserStatus.DISABLED) {
        if (session.user) {
          session.user.email = null;
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
