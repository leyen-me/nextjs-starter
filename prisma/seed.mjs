import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const SYS_CONFIGS = {
  dictMap: {
    LabelType: {
      type: "dict",
      data: [
        {
          label: "common.dict.labelType.text",
          labelType: "I18N",
          value: "TEXT",
        },
        {
          label: "common.dict.labelType.i18n",
          labelType: "I18N",
          value: "I18N",
        },
      ],
    },
    SysUserGender: {
      type: "dict",
      data: [
        {
          label: "common.dict.gender.male",
          labelType: "I18N",
          value: "MALE",
          color: "primary",
        },
        {
          label: "common.dict.gender.female",
          labelType: "I18N",
          value: "FEMALE",
          color: "secondary",
        },
        {
          label: "common.dict.gender.unknown",
          labelType: "I18N",
          value: "UNKNOWN",
          color: "default",
        },
      ],
    },
    SysUserStatus: {
      type: "dict",
      data: [
        {
          label: "common.dict.status.normal",
          labelType: "I18N",
          value: "NORMAL",
          color: "success",
        },
        {
          label: "common.dict.status.disabled",
          labelType: "I18N",
          value: "DISABLED",
          color: "error",
        },
      ],
    },
    SysMenuType: {
      type: "dict",
      data: [
        {
          label: "common.dict.menu.type.menu",
          labelType: "I18N",
          value: "MENU",
          color: "primary",
        },
        {
          label: "common.dict.menu.type.interface",
          labelType: "I18N",
          value: "INTERFACE",
          color: "secondary",
        },
      ],
    },
    SysMenuOpenStyle: {
      type: "dict",
      data: [
        {
          label: "common.dict.menu.openStyle.internal",
          labelType: "I18N",
          value: "INTERNAL",
          color: "primary",
        },
        {
          label: "common.dict.menu.openStyle.external",
          labelType: "I18N",
          value: "EXTERNAL",
          color: "secondary",
        },
      ],
    },
  },
};

const initSysConfig = async () => {
  const config = await prisma.sysConfig.findFirst();
  await prisma.sysConfig.upsert({
    where: {
      id: config?.id || "default",
    },
    update: {
      config: SYS_CONFIGS,
    },
    create: {
      config: SYS_CONFIGS,
    },
  });
};

const SYS_USERS = [
  {
    id: "a",
    nickname: "a",
    avatar: "/assets/jpg/assets-default-avatar.jpg",
    email: "a@a.com",
    password: "$2b$10$okTMFKA2RCJQDW4pA06yqOpaCuSWgeIpZKCR6pAN5XI4tdC3RMU/.",
    superAdmin: true,
    gender: "MALE",
  },
  {
    id: "b",
    nickname: "b",
    avatar: "/assets/jpg/assets-default-avatar.jpg",
    email: "b@b.com",
    password: "$2b$10$okTMFKA2RCJQDW4pA06yqOpaCuSWgeIpZKCR6pAN5XI4tdC3RMU/.",
    gender: "MALE",
  },
  {
    id: "c",
    nickname: "c",
    avatar: "/assets/jpg/assets-default-avatar.jpg",
    email: "c@c.com",
    password: "$2b$10$okTMFKA2RCJQDW4pA06yqOpaCuSWgeIpZKCR6pAN5XI4tdC3RMU/.",
    gender: "MALE",
  },
];

const initSysUser = async () => {
  SYS_USERS.forEach(async (user) => {
    await prisma.sysUser.upsert({
      where: {
        email: user.email,
      },
      update: user,
      create: user,
    });
  });
};

const SYS_ROLES = [
  {
    id: "admin",
    name: "admin",
  },
  {
    id: "user",
    name: "user",
  },
];

const initSysRole = async () => {
  SYS_ROLES.forEach(async (role) => {
    await prisma.sysRole.upsert({
      where: {
        id: role.id,
      },
      update: {
        name: role.name,
      },
      create: {
        id: role.id,
        name: role.name,
      },
    });
  });
};

const SYS_USER_ROLES = [
  {
    id: "1",
    userId: "b",
    roleId: "admin",
  },
  {
    id: "2",
    userId: "b",
    roleId: "user",
  },
  {
    id: "3",
    userId: "c",
    roleId: "user",
  },
];

const initSysUserRole = async () => {
  SYS_USER_ROLES.forEach(async (userRole) => {
    await prisma.sysUserRole.upsert({
      where: {
        id: userRole.id,
      },
      update: userRole,
      create: userRole,
    });
  });
};

const SYS_MENUS = [
  {
    id: "dashboard",
    pid: "0",
    name: "pages.admin.menus.dashboard",
    url: "/admin/dashboard",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "HomeOutlined",
    sort: 1,
  },

  {
    id: "system",
    pid: "0",
    name: "pages.admin.menus.system",
    url: "/admin/system-management",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "SettingsOutlined",
    sort: 2,
  },

  {
    id: "user",
    pid: "system",
    name: "pages.admin.menus.user",
    url: "/admin/user",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "AccountCircleOutlined",
    sort: 1,
  },
  {
    id: "user-add",
    pid: "user",
    name: "pages.common.interface.add",
    url: "",
    type: "INTERFACE",
    authority: "sys:user:add",
    openStyle: "INTERNAL",
    icon: "",
    sort: 1,
  },
  {
    id: "user-delete",
    pid: "user",
    name: "pages.common.interface.delete",
    url: "",
    type: "INTERFACE",
    authority: "sys:user:delete",
    openStyle: "INTERNAL",
    icon: "",
    sort: 2,
  },
  {
    id: "user-edit",
    pid: "user",
    name: "pages.common.interface.edit",
    url: "",
    type: "INTERFACE",
    authority: "sys:user:edit",
    openStyle: "INTERNAL",
    icon: "",
    sort: 3,
  },
  {
    id: "user-info",
    pid: "user",
    name: "pages.common.interface.info",
    url: "",
    type: "INTERFACE",
    authority: "sys:user:info",
    openStyle: "INTERNAL",
    icon: "",
    sort: 4,
  },
  {
    id: "user-list",
    pid: "user",
    name: "pages.common.interface.list",
    url: "",
    type: "INTERFACE",
    authority: "sys:user:list",
    openStyle: "INTERNAL",
    icon: "",
    sort: 5,
  },
  {
    id: "user-page",
    pid: "user",
    name: "pages.common.interface.page",
    url: "",
    type: "INTERFACE",
    authority: "sys:user:page",
    openStyle: "INTERNAL",
    icon: "",
    sort: 6,
  },

  {
    id: "role",
    pid: "system",
    name: "pages.admin.menus.role",
    url: "/admin/role",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "VerifiedUserOutlined",
    sort: 2,
  },
  {
    id: "role-add",
    pid: "role",
    name: "pages.common.interface.add",
    url: "",
    type: "INTERFACE",
    authority: "sys:role:add",
    openStyle: "INTERNAL",
    icon: "",
    sort: 1,
  },
  {
    id: "role-delete",
    pid: "role",
    name: "pages.common.interface.delete",
    url: "",
    type: "INTERFACE",
    authority: "sys:role:delete",
    openStyle: "INTERNAL",
    icon: "",
    sort: 2,
  },
  {
    id: "role-edit",
    pid: "role",
    name: "pages.common.interface.edit",
    url: "",
    type: "INTERFACE",
    authority: "sys:role:edit",
    openStyle: "INTERNAL",
    icon: "",
    sort: 3,
  },
  {
    id: "role-info",
    pid: "role",
    name: "pages.common.interface.info",
    url: "",
    type: "INTERFACE",
    authority: "sys:role:info",
    openStyle: "INTERNAL",
    icon: "",
    sort: 4,
  },
  {
    id: "role-list",
    pid: "role",
    name: "pages.common.interface.list",
    url: "",
    type: "INTERFACE",
    authority: "sys:role:list",
    openStyle: "INTERNAL",
    icon: "",
    sort: 5,
  },
  {
    id: "role-page",
    pid: "role",
    name: "pages.common.interface.page",
    url: "",
    type: "INTERFACE",
    authority: "sys:role:page",
    openStyle: "INTERNAL",
    icon: "",
    sort: 6,
  },

  {
    id: "menu",
    pid: "system",
    name: "pages.admin.menus.menu",
    url: "/admin/menu",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "MenuOutlined",
    sort: 3,
  },
  {
    id: "menu-add",
    pid: "menu",
    name: "pages.common.interface.add",
    url: "",
    type: "INTERFACE",
    authority: "sys:menu:add",
    openStyle: "INTERNAL",
    icon: "",
    sort: 1,
  },
  {
    id: "menu-delete",
    pid: "menu",
    name: "pages.common.interface.delete",
    url: "",
    type: "INTERFACE",
    authority: "sys:menu:delete",
    openStyle: "INTERNAL",
    icon: "",
    sort: 2,
  },
  {
    id: "menu-edit",
    pid: "menu",
    name: "pages.common.interface.edit",
    url: "",
    type: "INTERFACE",
    authority: "sys:menu:edit",
    openStyle: "INTERNAL",
    icon: "",
    sort: 3,
  },
  {
    id: "menu-info",
    pid: "menu",
    name: "pages.common.interface.info",
    url: "",
    type: "INTERFACE",
    authority: "sys:menu:info",
    openStyle: "INTERNAL",
    icon: "",
    sort: 4,
  },
  {
    id: "menu-list",
    pid: "menu",
    name: "pages.common.interface.list",
    url: "",
    type: "INTERFACE",
    authority: "sys:menu:list",
    openStyle: "INTERNAL",
    icon: "",
    sort: 5,
  },
  {
    id: "menu-page",
    pid: "menu",
    name: "pages.common.interface.page",
    url: "",
    type: "INTERFACE",
    authority: "sys:menu:page",
    openStyle: "INTERNAL",
    icon: "",
    sort: 6,
  },

  {
    id: "config",
    pid: "system",
    name: "pages.admin.menus.config",
    url: "/admin/config",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "SettingsOutlined",
    sort: 4,
  },
  {
    id: "config-edit",
    pid: "config",
    name: "pages.common.interface.edit",
    url: "",
    type: "INTERFACE",
    authority: "sys:config:edit",
    openStyle: "INTERNAL",
  },
];

const initSysMenu = async () => {
  for (const menu of SYS_MENUS) {
    await prisma.sysMenu.upsert({
      where: { id: menu.id },
      update: menu,
      create: menu,
    });
  }
};

async function main() {
  await initSysConfig();
  await initSysUser();
  await initSysRole();
  await initSysUserRole();
  await initSysMenu();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
