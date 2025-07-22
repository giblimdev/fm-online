/*
  Warnings:

  - You are about to drop the column `Image` on the `document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "document" DROP COLUMN "Image",
ADD COLUMN     "image" TEXT;
