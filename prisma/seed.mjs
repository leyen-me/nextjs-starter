import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const CONFIG_DATA = {
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
    Gender: {
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
    UserStatus: {
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
    MenuType: {
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
    MenuOpenStyle: {
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

const initGlobalConfig = async () => {
  const config = await prisma.globalConfig.findFirst();
  await prisma.globalConfig.upsert({
    where: {
      id: config?.id || "default",
    },
    update: {
      config: CONFIG_DATA,
    },
    create: {
      config: CONFIG_DATA,
    },
  });
};

const USERS = [
  {
    id: "1",
    nickname: "a",
    avatar: "/assets/jpegs/user.jpg",
    email: "a@a.com",
    password: "$2b$10$okTMFKA2RCJQDW4pA06yqOpaCuSWgeIpZKCR6pAN5XI4tdC3RMU/.",
    superAdmin: true,
    gender: "MALE",
  },
  {
    id: "2",
    nickname: "b",
    avatar: "/assets/jpegs/user.jpg",
    email: "b@b.com",
    password: "$2b$10$okTMFKA2RCJQDW4pA06yqOpaCuSWgeIpZKCR6pAN5XI4tdC3RMU/.",
    gender: "MALE",
  },
  {
    id: "3",
    nickname: "c",
    avatar: "/assets/jpegs/user.jpg",
    email: "c@c.com",
    password: "$2b$10$okTMFKA2RCJQDW4pA06yqOpaCuSWgeIpZKCR6pAN5XI4tdC3RMU/.",
    gender: "MALE",
  },
];

const initUser = async () => {
  USERS.forEach(async (user) => {
    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: user,
      create: user,
    });
  });
};

const ROLES = [
  {
    id: "admin",
    name: "admin",
  },
  {
    id: "user",
    name: "user",
  },
];

const initRole = async () => {
  ROLES.forEach(async (role) => {
    await prisma.role.upsert({
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

const USER_ROLES = [
  {
    id: "1",
    userId: "1",
    roleId: "admin",
  },
  {
    id: "2",
    userId: "1",
    roleId: "user",
  },
];

const initUserRole = async () => {
  USER_ROLES.forEach(async (userRole) => {
    await prisma.userRole.upsert({
      where: {
        id: userRole.id,
      },
      update: userRole,
      create: userRole,
    });
  });
};

const MENUS = [
  {
    id: "1",
    pid: "0",
    name: "pages.admin.menus.dashboard",
    url: "/admin/dashboard",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "HomeOutlined",
    sort: 1,
  },
  {
    id: "2",
    pid: "0",
    name: "pages.admin.menus.system",
    url: "/admin/system-management",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "SettingsOutlined",
    sort: 2,
  },
  {
    id: "3",
    pid: "2",
    name: "pages.admin.menus.user",
    url: "/admin/user",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "AccountCircleOutlined",
    sort: 1,
  },
  {
    id: "4",
    pid: "2",
    name: "pages.admin.menus.role",
    url: "/admin/role",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "VerifiedUserOutlined",
    sort: 2,
  },
  {
    id: "5",
    pid: "2",
    name: "pages.admin.menus.menu",
    url: "/admin/menu",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "MenuOutlined",
    sort: 3,
  },
  {
    id: "6",
    pid: "2",
    name: "pages.admin.menus.config",
    url: "/admin/config",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "SettingsOutlined",
    sort: 4,
  },
];

const initMenu = async () => {
  for (const menu of MENUS) {
    await prisma.menu.upsert({
      where: { id: menu.id },
      update: menu,
      create: menu,
    });
  }
};

async function main() {
  await initGlobalConfig();
  await initUser();
  await initRole();
  await initUserRole();
  await initMenu();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
