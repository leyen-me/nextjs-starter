import { prisma } from "@/libs/prisma";
import { buildError, buildSuccess } from "@/utils/response";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const data = await req.json();
    try {
        await prisma.role.update({
            where: {
                id,
            },
            data,
        });
    } catch (error) {
        console.error(error);
        return buildError({ message: "server.common.update.failed" });
    }
    return buildSuccess({ message: "server.common.update.success" });
}

// todo: 删除角色时，需要判断角色是否被用户关联
// todo: 删除角色时，需要删除角色关联的菜单
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    try {
        await prisma.role.delete({
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
        const role = await prisma.role.findUnique({
            where: {
                id,
            },
        });
        return buildSuccess({ data: role });
    } catch (error) {
        console.error(error);
        return buildError({ message: "server.common.info.failed" });
    }
}