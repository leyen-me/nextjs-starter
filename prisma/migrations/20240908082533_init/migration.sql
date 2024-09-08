/*
  Warnings:

  - You are about to drop the column `open_style` on the `Menu` table. All the data in the column will be lost.
  - Added the required column `openStyle` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "open_style",
ADD COLUMN     "openStyle" "OpenStyle" NOT NULL;
