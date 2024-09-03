import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initGlobalConfig = async () => {
  const config = await prisma.globalConfig.findFirst({
    where: {
      language: "ZH",
    },
  });
  if (config) {
    return;
  }
  await prisma.globalConfig.create({
    data: {
      language: "ZH",
      config: {
        siteName: "My Site",
      },
    },
  });
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
