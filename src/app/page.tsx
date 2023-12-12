import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/lib/authOptions';
import MainNavbar from '@/components/Navbar/navbar-server';
import Image from 'next/image';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="bg-indigo-100 min-h-screen">
      <MainNavbar />
      <div className="mt-20"></div>
      <section className="grid lg:grid-cols-2 md:mx-20 sm:mx-10 mx-5 items-center">
        <div className="sm:my-20 my-10">
          <h1 className="font-bold md:text-5xl text-4xl lg:w-[410px]">
            Enjoy your quiz experience with
            <span className="text-blue"> Quizzard</span>
          </h1>
          <p className="sm:pt-10 pt-5 md:text-xl text-lg lg:w-[373px]">
            Intuitive Quiz-Taking Interface, and Results Tracking.
          </p>
          <Link href={session ? '/dashboard' : '/register'}>
            <button className="text-white bg-blue rounded-lg px-10 sm:mt-10 mt-5 py-3">
              {session ? 'Dashboard' : 'Get Started'}
            </button>
          </Link>
        </div>
        <div className="lg:block hidden">
          <Image
            src="/assets/people-quiz.svg"
            alt="logo"
            height={0}
            width={0}
            style={{ width: '25rem', height: 'auto' }}
            priority
          />
        </div>
      </section>
    </main>
  );
}
