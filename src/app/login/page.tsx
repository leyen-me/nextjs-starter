"use client";

import React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import logoBg from "@/app/assets/svgs/assets-login-bg.svg";
import logo from "@/app/assets/svgs/assets-dark-logo.svg";
import google from "@/app/assets/svgs/assets-google-icon.svg";
import Button from "@mui/material/Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl,
    });
  };

  const handleGithubLogin = async () => {
    await signIn("github", { callbackUrl });
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl });
  };

  return (
    <div className="flex flex-col h-full justify-between xl:flex-row">
      <div className="h-48 xl:h-full relative justify-center items-center flex xl:flex-1">
        <div className="w-full h-full login-background absolute top-0 left-0"></div>
        <div className="w-full h-16 absolute top-0 left-0 px-6">
          <Image className="w-48 h-full" src={logo} alt="login" />
        </div>
        <Image
          className="w-[500px] h-[500px] hidden xl:block"
          src={logoBg}
          alt="login"
        />
      </div>
      <div className="px-20 flex flex-col justify-center">
        <h1 className="mx-0 my-2 text-2xl font-bold">
          Welcome to Nextjs Starter
        </h1>
        <p className="mx-0 my-2 text-sm text-gray-500">Your Admin Dashboard</p>
        <div className="w-full flex justify-center">
          <ul className="w-full flex gap-2">
            <li className="flex-1">
              <Button
                variant="outlined"
                className="w-full"
                startIcon={
                  <Image src={google} className="w-auto h-1/2" alt="google" />
                }
                onClick={handleGoogleLogin}
              >
                Google
              </Button>
            </li>
            <li className="flex-1">
              <Button
                className="w-full"
                variant="outlined"
                onClick={handleGithubLogin}
              >
                GitHub
              </Button>
            </li>
          </ul>
        </div>
        <ul className="mt-10">
          <li>
            <h3>邮箱登录</h3>
            <form onSubmit={handleEmailLogin}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button type="submit">Log in</button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
}
