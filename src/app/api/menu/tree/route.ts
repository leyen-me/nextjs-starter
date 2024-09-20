import { prisma } from "@/libs/prisma";
import { buildSuccess } from "@/utils/response";
import { flatToTree } from "@/utils/tree";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const menus = await prisma.menu.findMany({
        orderBy: {
            sort: "asc",
        },
    });
    return buildSuccess({ data: flatToTree(menus) });
}
