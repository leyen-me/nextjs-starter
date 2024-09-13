-- CreateEnum
CREATE TYPE "LabelType" AS ENUM ('TEXT', 'I18N');

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "nameType" "LabelType" NOT NULL DEFAULT 'TEXT';
