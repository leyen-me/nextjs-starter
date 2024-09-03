-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ZH', 'EN');

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleMenu" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,

    CONSTRAINT "RoleMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalConfig" (
    "id" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "config" JSONB NOT NULL,

    CONSTRAINT "GlobalConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoleMenu_roleId_menuId_key" ON "RoleMenu"("roleId", "menuId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_roleId_key" ON "UserRole"("userId", "roleId");
