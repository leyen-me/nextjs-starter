/*
  Warnings:

  - You are about to drop the `GlobalConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoleAuthorityMenu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoleMenu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SysUserGender" AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "SysUserStatus" AS ENUM ('NORMAL', 'DISABLED');

-- CreateEnum
CREATE TYPE "SysMenuType" AS ENUM ('MENU', 'INTERFACE');

-- CreateEnum
CREATE TYPE "SysMenuOpenStyle" AS ENUM ('INTERNAL', 'EXTERNAL');

-- CreateEnum
CREATE TYPE "SysImageMimeType" AS ENUM ('JPEG', 'PNG', 'GIF', 'WEBP', 'BMP', 'TIFF', 'SVG');

-- DropTable
DROP TABLE "GlobalConfig";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Menu";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "RoleAuthorityMenu";

-- DropTable
DROP TABLE "RoleMenu";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserRole";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "ImageMimeType";

-- DropEnum
DROP TYPE "MenuType";

-- DropEnum
DROP TYPE "OpenStyle";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "SysUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nickname" TEXT,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "gender" "SysUserGender" NOT NULL DEFAULT 'UNKNOWN',
    "mobile" TEXT,
    "status" "SysUserStatus" NOT NULL DEFAULT 'NORMAL',
    "superAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SysUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SysMenu" (
    "id" TEXT NOT NULL,
    "pid" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "nameType" "LabelType" NOT NULL DEFAULT 'I18N',
    "url" VARCHAR(200) NOT NULL,
    "authority" VARCHAR(200),
    "type" "SysMenuType" NOT NULL,
    "openStyle" "SysMenuOpenStyle" NOT NULL,
    "icon" VARCHAR(50),
    "sort" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SysMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SysRole" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SysRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SysRoleMenu" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SysRoleMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SysRoleAuthorityMenu" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SysRoleAuthorityMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SysUserRole" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SysUserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SysConfig" (
    "id" TEXT NOT NULL,
    "config" JSONB NOT NULL,

    CONSTRAINT "SysConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SysImage" (
    "id" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "mimeType" "SysImageMimeType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SysImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SysUser_email_key" ON "SysUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SysRole_name_key" ON "SysRole"("name");
