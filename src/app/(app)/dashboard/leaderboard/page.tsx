import { PrismaClient } from '@prisma/client';
import { columns } from './columns';
import { sortByPercentageScore } from '@/lib/utils';
import { DataTable } from './data-table';

const prisma = new PrismaClient();
export default async function LeaderBoard() {
  const allQuizzes = await prisma.quizTaken.findMany();
  const sortedQuizzes = sortByPercentageScore(allQuizzes);

  // const cardStyle = {
  //   background:
  //     'linear-gradient(180deg, rgba(0, 117, 255, 0.85) 0%, rgba(245, 245, 245, 1) 100%)',
  // };

  return (
    <div className="lg:pl-56 px-3 py-10 min-h-screen bg-indigo-100 -z-20">
      <DataTable columns={columns} data={sortedQuizzes} />
    </div>
  );
}
