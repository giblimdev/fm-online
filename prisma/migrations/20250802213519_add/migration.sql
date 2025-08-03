/*
  Warnings:

  - You are about to drop the `_TextToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TextToUser" DROP CONSTRAINT "_TextToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TextToUser" DROP CONSTRAINT "_TextToUser_B_fkey";

-- DropTable
DROP TABLE "_TextToUser";

-- CreateTable
CREATE TABLE "user_text" (
    "userId" TEXT NOT NULL,
    "textId" TEXT NOT NULL,

    CONSTRAINT "user_text_pkey" PRIMARY KEY ("userId","textId")
);

-- CreateTable
CREATE TABLE "_UserTexts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserTexts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserTexts_B_index" ON "_UserTexts"("B");

-- AddForeignKey
ALTER TABLE "user_text" ADD CONSTRAINT "user_text_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_text" ADD CONSTRAINT "user_text_textId_fkey" FOREIGN KEY ("textId") REFERENCES "texts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTexts" ADD CONSTRAINT "_UserTexts_A_fkey" FOREIGN KEY ("A") REFERENCES "texts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTexts" ADD CONSTRAINT "_UserTexts_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
