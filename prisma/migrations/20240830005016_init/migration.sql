-- CreateEnum
CREATE TYPE "MenuType" AS ENUM ('MENU', 'INTERFACE');

-- CreateEnum
CREATE TYPE "OpenStyle" AS ENUM ('INTERNAL', 'EXTERNAL');

-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "pid" BIGINT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "url" VARCHAR(200) NOT NULL,
    "type" "MenuType" NOT NULL,
    "open_style" "OpenStyle" NOT NULL,
    "icon" VARCHAR(50),
    "sort" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);
