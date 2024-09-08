import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const CONFIG_DATA = {
  dictMap: {
    Gender: {
      type: "dict",
      data: [
        {
          label: "common.dict.gender.male",
          labelType: "i18n",
          value: "MALE",
          color: "primary",
        },
        {
          label: "common.dict.gender.female",
          labelType: "i18n",
          value: "FEMALE",
          color: "secondary",
        },
        {
          label: "common.dict.gender.unknown",
          labelType: "i18n",
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
          labelType: "i18n",
          value: "NORMAL",
          color: "success",
        },
        {
          label: "common.dict.status.disabled",
          labelType: "i18n",
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
          labelType: "i18n",
          value: "MENU",
          color: "primary",
        },
        {
          label: "common.dict.menu.type.interface",
          labelType: "i18n",
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
          labelType: "i18n",
          value: "INTERNAL",
          color: "primary",
        },
        {
          label: "common.dict.menu.openStyle.external",
          labelType: "i18n",
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
      id: config?.id || 'default'
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
    email: "a@a.com",
    password: "$2b$10$okTMFKA2RCJQDW4pA06yqOpaCuSWgeIpZKCR6pAN5XI4tdC3RMU/.",
    gender: "MALE",
  },
  {
    id: "2",
    nickname: "b",
    email: "b@b.com",
    password: "$2b$10$okTMFKA2RCJQDW4pA06yqOpaCuSWgeIpZKCR6pAN5XI4tdC3RMU/.",
    gender: "MALE",
  },
  {
    id: "3",
    nickname: "c",
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
    name: "Dashboard",
    url: "/admin/dashboard",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "DashboardIcon",
    sort: 1,
  },
  {
    id: "2",
    pid: "0",
    name: "User",
    url: "/admin/user",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "PersonIcon",
    sort: 2,
  },
  {
    id: "3",
    pid: "0",
    name: "Role",
    url: "/admin/role",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "SecurityIcon",
    sort: 3,
  },
  {
    id: "4",
    pid: "0",
    name: "Menu",
    url: "/admin/menu",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "MenuIcon",
    sort: 4,
  },
  {
    id: "5",
    pid: "0",
    name: "Orders",
    url: "/orders",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "ShoppingCartIcon",
    sort: 5,
  },
  {
    id: "6",
    pid: "5",
    name: "New Orders",
    url: "/orders/new",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "AddShoppingCartIcon",
    sort: 1,
  },
  {
    id: "7",
    pid: "5",
    name: "Processing",
    url: "/orders/processing",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "LoopIcon",
    sort: 2,
  },
  {
    id: "8",
    pid: "5",
    name: "Completed",
    url: "/orders/completed",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "CheckCircleIcon",
    sort: 3,
  },
  {
    id: "9",
    pid: "0",
    name: "Customers",
    url: "/customers",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "PeopleIcon",
    sort: 6,
  },
  {
    id: "10",
    pid: "9",
    name: "Customer List",
    url: "/customers/list",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "ListIcon",
    sort: 1,
  },
  {
    id: "11",
    pid: "10",
    name: "Active Customers",
    url: "/customers/list/active",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "CheckIcon",
    sort: 1,
  },
  {
    id: "12",
    pid: "10",
    name: "Inactive Customers",
    url: "/customers/list/inactive",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "BlockIcon",
    sort: 2,
  },
  {
    id: "13",
    pid: "9",
    name: "Customer Segments",
    url: "/customers/segments",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "GroupWorkIcon",
    sort: 2,
  },
  {
    id: "14",
    pid: "13",
    name: "Create Segment",
    url: "/customers/segments/create",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "AddIcon",
    sort: 1,
  },
  {
    id: "15",
    pid: "13",
    name: "Manage Segments",
    url: "/customers/segments/manage",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "SettingsIcon",
    sort: 2,
  },
  {
    id: "16",
    pid: "0",
    name: "Inventory",
    url: "/inventory",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "InventoryIcon",
    sort: 7,
  },
  {
    id: "17",
    pid: "16",
    name: "Stock Management",
    url: "/inventory/stock",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "InventoryIcon",
    sort: 1,
  },
  {
    id: "18",
    pid: "16",
    name: "Suppliers",
    url: "/inventory/suppliers",
    type: "MENU",
    openStyle: "INTERNAL",
    icon: "LocalShippingIcon",
    sort: 2,
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
