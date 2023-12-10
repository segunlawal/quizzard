/*
  Warnings:

  - You are about to drop the column `quiz` on the `QuizTaken` table. All the data in the column will be lost.
  - Added the required column `numberOfCorrectAnswers` to the `QuizTaken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfQuestions` to the `QuizTaken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentageScored` to the `QuizTaken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quizTitle` to the `QuizTaken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuizTaken" DROP COLUMN "quiz",
ADD COLUMN     "numberOfCorrectAnswers" INTEGER NOT NULL,
ADD COLUMN     "numberOfQuestions" INTEGER NOT NULL,
ADD COLUMN     "percentageScored" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quizTitle" TEXT NOT NULL;
