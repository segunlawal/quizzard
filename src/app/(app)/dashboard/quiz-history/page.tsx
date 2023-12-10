import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();
export default async function QuizHistory() {
  const session = (await getServerSession(authOptions)) as Session;
  const allQuizzes = await prisma.quizTaken.findMany({
    where: {
      authorId: Number(session?.user?.id),
    },
  });

  console.log(allQuizzes);
  return (
    <div className="lg:pl-56 px-3 py-10 min-h-screen bg-indigo-100">
      Quiz History
      {allQuizzes.map((quiz) => {
        return (
          <div key={quiz.id}>
            <p>{quiz.percentageScored}</p>
            <p>{quiz.takenAt.toString()}</p>
          </div>
        );
      })}
    </div>
  );
}
