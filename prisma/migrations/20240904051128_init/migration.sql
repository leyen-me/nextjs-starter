/*
  Warnings:

  - You are about to drop the column `language` on the `GlobalConfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GlobalConfig" DROP COLUMN "language";

-- DropEnum
DROP TYPE "Language";
