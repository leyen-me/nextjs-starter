import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/libs/prisma";
import { buildError, buildSuccess } from "@/utils/response";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  // 校验是否已经注册
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return buildError({ message: "server.auth.register.emailAlreadyExists" })
  }
  const hashedPassword = await hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return buildSuccess({
    message: "server.auth.register.success",
  });
}
