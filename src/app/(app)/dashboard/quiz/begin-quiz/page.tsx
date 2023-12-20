import { addShuffledChoices } from '@/lib/utils';
import QuizQuestions from './QuizQuestions';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = async (props: Props) => {
  const session = (await getServerSession(authOptions)) as Session;

  try {
    const data = await getData(props);
    const searchParams = props.searchParams;
    const category = searchParams.category;

    const shuffledData = addShuffledChoices(data?.results);

    return (
      <div>
        <QuizQuestions
          data={shuffledData}
          category={category}
          takerId={session?.user?.id}
          takerName={session?.user?.name}
        />
      </div>
    );
  } catch (error) {
    // Handle API error here
    return (
      <div className="text-center mt-20">
        <Image
          src="/assets/error-img.svg"
          alt="logo"
          height={0}
          width={0}
          style={{ width: '200px', height: 'auto' }}
          priority
          className="mx-auto"
        />
        Error fetching quiz data. Please try again later.
      </div>
    );
  }
};

export default page;

async function getData(props: Props) {
  const searchParams = props.searchParams;
  const amount = searchParams.numberOfQuestions;
  const category = searchParams.category;
  if (!amount) {
    redirect('/dashboard/quiz');
  }
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${amount}${
      category !== '0' ? `&category=${category}` : ''
    }`,
    { cache: 'no-store' },
  );

  if (!res.ok) {
    console.error(res);
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
