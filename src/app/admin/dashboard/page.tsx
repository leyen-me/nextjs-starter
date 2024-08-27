"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user?.email}
        <br />
        <button onClick={() => signOut()}>退出登录</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
