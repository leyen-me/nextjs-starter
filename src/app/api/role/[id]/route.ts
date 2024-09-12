import { prisma } from "@/libs/prisma";
import { updateManyToManyRelation } from "@/utils/relationUtils";
import { buildError, buildSuccess } from "@/utils/response";
import { Role } from "@prisma/client";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const { menuIdList, ...data }: { menuIdList: string[]; data: Role } = await req.json();
    try {
        await prisma.$transaction(async (prisma) => {
            // Update role data
            await prisma.role.update({
                where: { id },
                data,
            });
            // Update role-menu relation
            await updateManyToManyRelation(prisma, {
                parentId: id,
                newChildIds: menuIdList,
                relationModel: prisma.roleMenu,
                parentIdField: "roleId",
                childIdField: "menuId",
            });
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
        // todo: 获取角色关联的菜单
        const roleMenus = await prisma.roleMenu.findMany({
            where: {
                roleId: id,
            },
        });
        const menuIdList = roleMenus.map((roleMenu) => roleMenu.menuId);
        return buildSuccess({ data: { ...role, menuIdList } });
    } catch (error) {
        console.error(error);
        return buildError({ message: "server.common.info.failed" });
    }
}