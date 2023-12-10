-- CreateTable
CREATE TABLE "QuizTaken" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "quiz" TEXT[],
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizTaken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuizTaken" ADD CONSTRAINT "QuizTaken_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
