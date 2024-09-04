import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await prisma.user.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
}