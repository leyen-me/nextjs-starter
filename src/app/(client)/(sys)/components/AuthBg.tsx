import React from "react";
import Image from "next/image";
import { Logo } from "@/components/Logo";

export const AuthBg = () => {
  return (
    <div className="h-16 xl:h-full relative justify-center items-center flex xl:flex-1">
      {/* background */}
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/assets/jpg/assets-default-login-bg.jpg"
        width={1932}
        height={1080}
        alt="login"
      />

      {/* header */}
      <div className="w-full h-16 absolute top-0 left-0 px-6 text-white">
        <Logo mode="header" />
      </div>
    </div>
  );
}
