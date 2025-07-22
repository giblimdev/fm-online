-- CreateTable
CREATE TABLE "document" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descrition" TEXT,
    "grade" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "documentId" TEXT NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
