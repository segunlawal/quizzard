import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/lib/authOptions';
import { signOut } from 'next-auth/react';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      Landing Page
      <Link href="/dashboard">Dashboard</Link>
      {/* <pre>{JSON.stringify(session)}</pre> */}
    </main>
  );
}
