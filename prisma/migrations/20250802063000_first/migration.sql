-- AlterTable
ALTER TABLE "texts" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ordre" INTEGER NOT NULL DEFAULT 20;

-- CreateTable
CREATE TABLE "_TextToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TextToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TextToUser_B_index" ON "_TextToUser"("B");

-- AddForeignKey
ALTER TABLE "_TextToUser" ADD CONSTRAINT "_TextToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "texts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TextToUser" ADD CONSTRAINT "_TextToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
