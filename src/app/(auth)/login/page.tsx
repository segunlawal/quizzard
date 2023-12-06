import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from './form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="bg-indigo-100 h-screen w-screen flex justify-center items-center flex-col">
      <Image
        src="/assets/logo.svg"
        alt="logo"
        height={0}
        width={0}
        style={{ width: '200px', height: 'auto' }}
        priority
      />
      <div className="mt-5 w-full sm:w-[500px]">
        <div className="sm:shadow-xl p-7 sm:bg-white rounded-xl">
          <h1 className="font-semibold text-xl">Log in</h1>
          <LoginForm />
          <p className="text-center mt-5 text-gray text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
