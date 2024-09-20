import { prisma } from "@/libs/prisma";
import { extractFiltersWithPagination } from "@/utils/extractFilters";
import { buildSuccess } from "@/utils/response";
import { Gender, Role, User, UserStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type RolePageFilters = {
    name?: string;
};

export async function GET(req: NextRequest, res: NextResponse) {
    const { page, pageSize, filters } = extractFiltersWithPagination(
        req.url || "",
        ["name"]
    );

    const roles = await prisma.role.findMany({
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
        where: filters,
    });

    const total = await prisma.role.count({
        where: filters,
    });

    return buildSuccess<Page<Role>>({ data: { total, data: roles } });
}
