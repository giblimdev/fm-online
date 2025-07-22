/*
  Warnings:

  - You are about to drop the column `descrition` on the `document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "document" DROP COLUMN "descrition",
ADD COLUMN     "description" TEXT;
