import { PrismaClient } from '@prisma/client';
import { columns } from './columns';
import { sortByPercentageScore } from '@/lib/utils';
import { DataTable } from './data-table';

const prisma = new PrismaClient();
export default async function LeaderBoard() {
  const allQuizzes = await prisma.quizTaken.findMany();
  const sortedQuizzes = sortByPercentageScore(allQuizzes);

  return (
    <div className="lg:pl-56 px-3 py-10 min-h-screen bg-indigo-100 -z-20">
      <DataTable columns={columns} data={sortedQuizzes} />
    </div>
  );
}
