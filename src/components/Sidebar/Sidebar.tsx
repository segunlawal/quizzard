'use client';
import {
  CommandLineIcon,
  UserGroupIcon,
  HomeIcon,
  ArrowLeftOnRectangleIcon,
  PresentationChartLineIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useEffect, useState } from 'react';
import Hamburger from './Hamburger';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Sidebar = () => {
  const segment = useSelectedLayoutSegment();
  const [openDrawer, setOpenDrawer] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpenDrawer(false);
  }, [pathname]);

  const sidebarOptions = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      current: !segment,
    },
    {
      name: 'Take Quiz',
      href: '/dashboard/quiz',
      icon: CommandLineIcon,
      current: `/${segment}` === '/quiz',
    },
    {
      name: 'Quiz History',
      href: '/dashboard/quiz-history',
      icon: PresentationChartLineIcon,
      current: `/${segment}` === '/quiz-history',
    },
    {
      name: 'Leaderboard',
      href: '/dashboard/leaderboard',
      icon: UserGroupIcon,
      current: `/${segment}` === '/leaderboard',
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: UserIcon,
      current: `/${segment}` === '/profile',
    },
  ];

  const drawer = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-custom-black px-6 pb-4 border-r-2 h-screen">
      <Link href="/" className="flex h-16 shrink-0 items-center gap-x-3">
        <Image
          src="/assets/dashboard-logo.svg"
          alt="logo"
          height={0}
          width={0}
          style={{ width: '150px', height: 'auto' }}
          priority
        />
      </Link>
      <nav className="flex flex-1 flex-col mt-10">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-7">
              {sidebarOptions.map((option) => (
                <li key={option.name}>
                  <Link
                    href={option.href}
                    className={classNames(
                      option.current
                        ? 'bg-white text-custom-black'
                        : 'text-gray hover:text-custom-black hover:bg-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                    )}
                  >
                    <option.icon
                      className="text-blue3 group-hover:text-custom-black h-6 w-6 shrink-0"
                      data-testid={`${option.name}-icon`}
                    />
                    {option.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
      <button
        className="pb-3 flex items-center gap-x-2 text-sm text-white"
        onClick={() => {
          signOut();
        }}
      >
        <ArrowLeftOnRectangleIcon className="h-6 w-6" />
        Logout
      </button>
    </div>
  );

  return (
    <div className="z-20">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col">
        {drawer}
      </div>
      <div className="relative">
        <div className={`${openDrawer && 'drop-shadow-2xl'} `}>
          {openDrawer && <div className="fixed w-64">{drawer}</div>}
        </div>
        <div
          className={`lg:hidden absolute ${
            openDrawer && 'left-64 border-[1px] border-blue'
          }`}
        >
          <Hamburger openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
