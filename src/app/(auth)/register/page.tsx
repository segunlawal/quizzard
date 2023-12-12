import Image from 'next/image';
import { RegisterForm } from './form';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/authOptions';

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }
  return (
    <div className="bg-indigo-100 h-screen w-screen flex justify-center items-center flex-col">
      <Link href="/">
        <Image
          src="/assets/logo.svg"
          alt="logo"
          height={0}
          width={0}
          style={{ width: '200px', height: 'auto' }}
          priority
        />
      </Link>
      <div className="mt-5 w-full sm:w-[500px]">
        <div className="sm:shadow-xl p-7  sm:bg-white rounded-xl">
          <h1 className="font-semibold text-xl">Get Started</h1>
          <RegisterForm />
          <p className="text-center mt-5 text-gray text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-blue hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
