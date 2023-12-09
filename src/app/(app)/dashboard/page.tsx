import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="lg:pl-56 px-3 py-10 min-h-screen bg-indigo-100">
      <Link href="/">Home</Link>
      Dashboard
    </div>
  );
}
