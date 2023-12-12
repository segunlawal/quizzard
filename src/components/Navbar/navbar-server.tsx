import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import Navbar from './Navbar';

export default async function MainNavbar() {
  const session = (await getServerSession(authOptions)) as Session | null;

  return <Navbar session={session} />;
}
