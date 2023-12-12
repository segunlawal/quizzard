'use client';
import { UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const NavItems = () => {
  return (
    <Link href="/dashboard/profile" className="text-xs ">
      <div className="flex items-center gap-2">
        <UserIcon className="h-6 w-6 text-custom-black" />
      </div>
    </Link>
  );
};

export default NavItems;
