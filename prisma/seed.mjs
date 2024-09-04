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

async function main() {
  await initGlobalConfig();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
