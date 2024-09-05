import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await req.json();
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        password: data.password ? encryptPassword(data.password) : undefined,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { message: "User updated successfully" },
    { status: 200 }
  );
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 }
  );
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      user.password = "";
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}
function encryptPassword(password: any) {
  throw new Error("Function not implemented.");
}
