/*
  Warnings:

  - Added the required column `mimeType` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ImageMimeType" AS ENUM ('JPEG', 'PNG', 'GIF', 'WEBP', 'BMP', 'TIFF', 'SVG');

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "mimeType" "ImageMimeType" NOT NULL;
