/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('NORMAL', 'DISABLED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'UNKNOWN',
ADD COLUMN     "mobile" TEXT,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'NORMAL';
