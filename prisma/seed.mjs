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
  },
};

const initGlobalConfig = async () => {
  const config = await prisma.globalConfig.findFirst();
  if (config) {
    // 更新
    await prisma.globalConfig.update({
      where: {
        id: config.id,
      },
      data: {
        config: CONFIG_DATA,
      },
    });
    return;
  } else {
    await prisma.globalConfig.create({
      data: {
        config: CONFIG_DATA,
      },
    });
  }
};

const USERS = [
  {
    nickname: "a",
    email: "a@a.com",
    password: "$2b$10$okTMFKA2RCJQDW4pA06yqOpaCuSWgeIpZKCR6pAN5XI4tdC3RMU/.",
    gender: "MALE",
  },
  {
    nickname: "b",
    email: "b@b.com",
    password: "$2b$10$okTMFKA2RCJQDW4pA06yqOpaCuSWgeIpZKCR6pAN5XI4tdC3RMU/.",
    gender: "MALE",
  },
  {
    nickname: "c",
    email: "c@c.com",
    password: "$2b$10$okTMFKA2RCJQDW4pA06yqOpaCuSWgeIpZKCR6pAN5XI4tdC3RMU/.",
    gender: "MALE",
  },
];

const initUser = async () => {
  USERS.forEach(async (user) => {
    const _user = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });
    if (_user) {
      // 修改
      await prisma.user.update({
        where: {
          id: _user.id,
        },
        data: {
          nickname: user.nickname,
          password: user.password,
          email: user.email,
          gender: user.gender,
        },
      });
      return;
    }
    await prisma.user.create({
      data: {
        nickname: user.nickname,
        email: user.email,
        password: user.password,
        gender: user.gender,
      },
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
    const _role = await prisma.role.findFirst({
      where: {
        id: role.id,
      },
    });
    if (_role) {
      // 修改
      await prisma.role.update({
        where: {
          id: _role.id,
        },
        data: {
          name: role.name,
        },
      });
      return;
    }
    await prisma.role.create({
      data: {
        id: role.id,
        name: role.name,
      },
    });
  });
};


async function main() {
  await initGlobalConfig();
  await initUser();
  await initRole();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
