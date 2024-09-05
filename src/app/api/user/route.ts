import { prisma } from "@/libs/prisma";
import { encryptPassword } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (existingUser) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 }
    );
  }
  data.password = encryptPassword(data.password);
  try {
    await prisma.user.create({
      data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { message: "User created successfully" },
    { status: 200 }
  );
}
