import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/libs/prisma";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const hashedPassword = await hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: "success" });
}
