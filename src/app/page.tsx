import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { LogoutButton } from './auth';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      Landing Page
      {/* <pre>{JSON.stringify(session)}</pre> */}
      {session?.user?.name}
      {session ? <LogoutButton /> : <Link href="/login">Login</Link>}
      <Link href="/dashboard">Dashboard</Link>
    </main>
  );
}
