-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('APP', 'CP', 'M', 'MMARQUE', 'VM', 'NAUTONIER', 'CPARCHEDOM', 'KT');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "grade" "Grade"[] DEFAULT ARRAY['APP']::"Grade"[];
