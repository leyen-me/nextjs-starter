import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/libs/prisma";
import { serverTranslate } from "@/i18n";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  // 校验是否已经注册
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return NextResponse.json(
      {
        message: serverTranslate(
          "server.auth.register.emailAlreadyExists",
          request
        ),
      },
      { status: 400 }
    );
  }

  const hashedPassword = await hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    message: serverTranslate("server.auth.register.success", request),
  });
}
