import { prisma } from "@/libs/prisma";
import { buildSuccess } from "@/utils/response";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const menus = await prisma.menu.findMany({
        orderBy: {
            sort: "asc",
        },
    });
    return buildSuccess({ data: menus });
}
