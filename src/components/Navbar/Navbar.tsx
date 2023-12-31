'use client';
interface Props {
  session: Session | null;
}
import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar({ session }: Props) {
  const navMenu = useRef(null);
  const [navbar, setNavbar] = useState(false);

  return (
    <nav
      ref={navMenu}
      className="border-b-[1px] border-b-gray border-opacity-25 lg:px-24 px-4 py-3"
    >
      <div className="justify-between mx-auto lg:items-center lg:flex">
        <div>
          <div className="flex items-center justify-between lg:block">
            <Link
              href="/"
              className="flex items-center gap-x-6 text-blue font-extrabold text-2xl"
            >
              <Image
                src="/assets/logo.svg"
                alt="logo"
                height={0}
                width={0}
                style={{ width: '150px', height: 'auto' }}
                priority
              />
            </Link>
            <div className="lg:hidden">
              <button
                type="submit"
                className="p-2 rounded-md outline-none"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-9 h-9 text-white"
                    viewBox="0 0 20 20"
                    fill="#434343"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-9 h-9 text-white"
                    fill="black"
                    viewBox="0 0 24 24"
                    stroke="#434343"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 lg:block md:pb-0 lg:mt-0 ${
              navbar ? 'block' : 'hidden'
            }`}
          >
            <ul className="lg:bg-inherit items-center xl:gap-12 justify-center space-y-5 lg:flex lg:space-x-6 lg:space-y-0">
              <li className="leading-[25px]">
                <Link href="/" className="flex items-center font-semibold">
                  Home
                </Link>
              </li>
              <li className="leading-[25px]">
                <Link href="/" className="flex items-center font-semibold">
                  About
                </Link>
              </li>
              <li className="leading-[25px]">
                <Link href="/" className="flex items-center font-semibold">
                  Contact Us
                </Link>
              </li>
            </ul>

            <div className="mt-5 space-y-2 lg:hidden flex flex-col">
              {session ? (
                <p className="font-semibold py-2 px-4  text-black rounded-md leading-5">
                  Welcome, {session?.user?.name}
                </p>
              ) : (
                <Link
                  href="/login"
                  className="font-semibold py-2 px-4  text-black rounded-md leading-5"
                  // onClick={() => setShowModal(true)}
                >
                  Log In
                </Link>
              )}
              {session ? (
                <Link
                  href="/dashboard"
                  className="font-semibold py-2 px-4 rounded-md bg-blue text-white"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/register"
                  className="font-semibold py-2 px-4 rounded-md bg-blue text-white"
                >
                  Sign up
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="hidden gap-x-3 lg:flex ">
          {session ? (
            <p className="font-semibold py-2 px-4  text-black rounded-md leading-5">
              Welcome, {session?.user?.name}
            </p>
          ) : (
            <Link
              href="/login"
              className="font-semibold py-2 px-4  text-black rounded-md leading-5"
            >
              Log In
            </Link>
          )}
          {session ? (
            <Link
              href="/dashboard"
              className="font-semibold py-2 px-4 rounded-md bg-blue text-white"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/register"
              className="font-semibold py-2 px-4 rounded-md bg-blue text-white"
            >
              Sign up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
