import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import StatsTable from './stats-table';
import { groupQuizResultsByTitle } from './helper';
import { DataTable } from './data-table';
import { columns } from './columns';

const prisma = new PrismaClient();
export default async function Settings() {
  const session = (await getServerSession(authOptions)) as Session;
  const allQuizzes = await prisma.quizTaken.findMany({
    where: {
      takerId: Number(session?.user?.id),
    },
  });
  const quizStats = groupQuizResultsByTitle(allQuizzes);
  console.log(quizStats);

  return (
    <div className="lg:pl-56 px-3 py-10 min-h-screen bg-indigo-100">
      <div className="shadow-lg p-7 bg-white rounded-xl">
        <h2 className="text-lg font-semibold">My Profile</h2>
        <div className="p-4 border-gray border-[1px] rounded-md mt-5 bg-white shadow-sm">
          <h3 className="text-md font-semibold">{session?.user.name}</h3>
          <p className="text-gray text-sm">{session?.user.email}</p>
        </div>
        <div className="p-4 border-gray border-[1px] rounded-md mt-5 bg-white shadow-sm">
          <h3 className="text-md font-semibold text-blue">Quiz Statistics</h3>
          <StatsTable allQuizzes={allQuizzes} />
        </div>
        <div className="p-4 border-gray border-[1px] rounded-md mt-5 bg-white shadow-sm">
          <h3 className="text-md font-semibold text-blue">
            Statistics By Category
          </h3>
          <DataTable columns={columns} data={quizStats} />
          {/* <StatsTable allQuizzes={allQuizzes} /> */}
        </div>
      </div>
    </div>
  );
}
