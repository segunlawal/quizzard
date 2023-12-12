/*
  Warnings:

  - You are about to drop the column `authorId` on the `QuizTaken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `takerId` to the `QuizTaken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `takerName` to the `QuizTaken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QuizTaken" DROP CONSTRAINT "QuizTaken_authorId_fkey";

-- AlterTable
ALTER TABLE "QuizTaken" DROP COLUMN "authorId",
ADD COLUMN     "takerId" INTEGER NOT NULL,
ADD COLUMN     "takerName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "QuizTaken" ADD CONSTRAINT "QuizTaken_takerId_fkey" FOREIGN KEY ("takerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizTaken" ADD CONSTRAINT "QuizTaken_takerName_fkey" FOREIGN KEY ("takerName") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
