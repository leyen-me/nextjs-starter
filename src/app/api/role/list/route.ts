import { prisma } from "@/libs/prisma";
import { buildSuccess } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const roles = await prisma.role.findMany();
    return buildSuccess({ data: roles });
}
