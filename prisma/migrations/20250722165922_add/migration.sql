-- AlterTable
ALTER TABLE "links" ADD COLUMN     "order" INTEGER,
ALTER COLUMN "title" DROP NOT NULL;
