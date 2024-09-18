import React from "react";
import Image from "next/image";
import { Logo } from "../Logo";

export default function AuthBg() {
  return (
    <div className="h-16 xl:h-full relative justify-center items-center flex xl:flex-1">
      <div className="w-full h-full login-background absolute top-0 left-0"></div>
      <div className="w-full h-16 absolute top-0 left-0 px-6">
        <Logo height="36%" />
      </div>
      <Image
        className="hidden xl:block z-10"
        src="/assets/svgs/assets-login-bg.svg"
        width={500}
        height={500}
        alt="login"
      />
    </div>
  );
}
