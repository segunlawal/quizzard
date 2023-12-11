import { PrismaClient } from '@prisma/client';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

const prisma = new PrismaClient();
export default async function LeaderBoard() {
  const allQuizzes = await prisma.quizTaken.findMany();

  console.log(allQuizzes);

  // const cardStyle = {
  //   background:
  //     'linear-gradient(180deg, rgba(0, 117, 255, 0.85) 0%, rgba(245, 245, 245, 1) 100%)',
  // };

  return (
    <div className="lg:pl-56 px-3 py-10 min-h-screen bg-indigo-100 -z-20">
      <h2>Leaderboard</h2>
      <DataTable columns={columns} data={allQuizzes} />
    </div>
  );
}
