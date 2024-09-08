import { prisma } from "@/libs/prisma";
import { buildSuccess } from "@/utils/response";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const roles = await prisma.role.findMany();
    return buildSuccess({ data: roles });
}
