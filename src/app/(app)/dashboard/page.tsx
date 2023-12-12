import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import {
  ArrowTrendingUpIcon,
  ChartBarSquareIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import {
  calculateAveragePercentage,
  findHighestPercentage,
} from './profile/helper';
import { sortByPercentageScore } from '@/lib/utils';
import { DataTable } from './data-table';
import { columns } from './columns';
import PersonalBest from './personal-best';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function Dashboard() {
  const session = (await getServerSession(authOptions)) as Session;
  const allQuizzes = await prisma.quizTaken.findMany({
    where: {
      takerId: Number(session?.user?.id),
    },
  });

  const quizzesFromAll = await prisma.quizTaken.findMany();
  const sortedQuizzes = sortByPercentageScore(quizzesFromAll);
  const topQuizzes = sortedQuizzes.slice(0, 5);
  const personalHighest = findHighestPercentage(allQuizzes);

  return (
    <div className="lg:pl-56 px-3 py-10 min-h-[93.4vh] bg-indigo-100">
      <section className="md:grid md:grid-cols-4 gap-7">
        <div className="col-span-3">
          <div className="grid sm:grid-cols-3 md:gap-16 sm:gap-10 gap-5 sm:w-auto w-2/3">
            <div className="bg-red-100 shadow-sm px-5 py-3 rounded-sm">
              <ChartBarSquareIcon className="w-6 text-blue" />
              <p className="font-bold text-xl">{allQuizzes.length}</p>
              <p className="text-gray text-sm">Total Quizzes</p>
            </div>
            <div className="bg-yellow-100 shadow-sm px-5 py-3 rounded-sm">
              <ChartPieIcon className="w-6 text-blue" />
              <p className="font-bold text-xl">
                {calculateAveragePercentage(allQuizzes)}%
              </p>
              <p className="text-gray text-sm">Your average Score</p>
            </div>
            <div className="bg-green-100 shadow-sm px-5 py-3 rounded-sm">
              <ArrowTrendingUpIcon className="w-6 text-blue" />
              <p className="font-bold text-xl">{personalHighest}%</p>
              <p className="text-gray text-sm">Your highest Score</p>
            </div>
          </div>

          <div className="bg-white shadow-sm mt-5 rounded-sm px-5 py-3">
            <div className="flex items-center justify-between">
              <p className="text-blue">Leaderboard</p>
              <Link href="/dashboard/leaderboard" className="text-gray text-sm">
                View All Details
              </Link>
            </div>
            <DataTable columns={columns} data={topQuizzes} />
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-sm px-5 py-3 col-span-3 md:col-span-1 md:mt-auto mt-7">
          <h2 className="text-blue">Your Personal Best</h2>
          <Link
            href="/dashboard/leaderboard"
            className="text-xs text-gray hover:text-blue"
          >
            Find more statistics
          </Link>
          <div className="md:mt-14 mt-5">
            <PersonalBest personalHighest={personalHighest} />
            <Link href="/dashboard/quiz">
              <button className="w-full mt-5 rounded-lg bg-blue hover:bg-blue text-white py-3 disabled:bg-gray">
                Take Quiz
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
