import { prisma } from "@/libs/prisma";
import { encryptPassword } from "@/utils";
import { buildError, buildSuccess } from "@/utils/response";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const data = await req.json();
    try {
        await prisma.$transaction(async (prisma) => {
            await prisma.menu.update({
                where: {
                    id,
                },
                data
            });
        });
    } catch (error) {
        console.error(error);
        return buildError({ message: "server.common.update.failed" });
    }
    return buildSuccess({ message: "server.common.update.success" });
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    try {
        await prisma.menu.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
        return buildError({ message: "server.common.delete.failed" });
    }
    return buildSuccess({ message: "server.common.delete.success" });
}

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    try {
        const menus = await prisma.menu.findUnique({
            where: {
                id,
            },
        });
        return buildSuccess({
            data: menus,
        });
    } catch (error) {
        console.error(error);
        return buildError({ message: "server.common.info.failed" });
    }
}
