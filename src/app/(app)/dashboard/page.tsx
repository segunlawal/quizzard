import { LogoutButton } from '@/app/auth';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div>
      <Link href="/">Home</Link>
      Dashboard
      <LogoutButton />
    </div>
  );
}
