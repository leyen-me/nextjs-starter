import { prisma } from "@/libs/prisma";
import { checkAuthority } from "@/utils/authUtil";
import { updateManyToManyRelation } from "@/utils/relationUtils";
import { buildError, buildSuccess } from "@/utils/response";
import { SysRole } from "@prisma/client";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await checkAuthority("sys:role:edit"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { id } = params;
  const {
    menuIdList,
    authorityMenuIdList,
    ...data
  }: { menuIdList: string[]; authorityMenuIdList: string[]; data: SysRole } =
    await req.json();
  try {
    await prisma.$transaction(async (prisma) => {
      // Update role data
      await prisma.sysRole.update({
        where: { id },
        data,
      });
      // Update role-menu relation
      await updateManyToManyRelation(prisma, {
        parentId: id,
        newChildIds: menuIdList,
        relationModel: prisma.sysRoleMenu,
        parentIdField: "roleId",
        childIdField: "menuId",
      });

      // Update role-authority-menu relation
      await updateManyToManyRelation(prisma, {
        parentId: id,
        newChildIds: authorityMenuIdList,
        relationModel: prisma.sysRoleAuthorityMenu,
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
  if (!(await checkAuthority("sys:role:delete"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { id } = params;
  try {
    await prisma.sysRole.delete({
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
  if (!(await checkAuthority("sys:role:info"))) {
    return buildError({ message: "server.auth.authority.insufficient" });
  }
  const { id } = params;
  try {
    const role = await prisma.sysRole.findUnique({
      where: {
        id,
      },
    });

    // Get role-menu relation
    const roleMenus = await prisma.sysRoleMenu.findMany({
      where: {
        roleId: id,
      },
    });
    const menuIdList = roleMenus.map((roleMenu) => roleMenu.menuId);

    // Get role-authority-menu relation
    const roleAuthorityMenus = await prisma.sysRoleAuthorityMenu.findMany({
      where: {
        roleId: id,
      },
    });
    const authorityMenuIdList = roleAuthorityMenus.map(
      (roleAuthorityMenu) => roleAuthorityMenu.menuId
    );

    return buildSuccess({ data: { ...role, menuIdList, authorityMenuIdList } });
  } catch (error) {
    console.error(error);
    return buildError({ message: "server.common.info.failed" });
  }
}
