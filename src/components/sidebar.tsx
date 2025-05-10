'use client';

import Image from 'next/image';
import { useTheme } from "@/context/theme-provider";
import { cn } from "@/lib/utils";
import { LogOutIcon, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Sidebar({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
    const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isLoginPage = pathname === '/login';

  return (
    <div
      className={cn(
        'fixed top-0 left-0 w-96 h-full z-50 p-6 space-y-6 flex flex-col border-r-2 rounded-r-lg',
        isLoginPage
          ? 'bg-transparent' // trasparente per login
          : 'bg-white dark:bg-gray-900 shadow-lg text-gray-900 dark:text-gray-100',
        !alwaysVisible && 'fixed right-4 top-16 lg:hidden',
      )}
    >
      <div className="flex justify-between items-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
          {isLoginPage ? 'Benvenuto!' : 'Menu'}
        </h2>
      </div>

      {isLoginPage ? (
        <motion.div
          className="flex flex-col items-center justify-center flex-1 bg-transparent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={
              theme === 'dark'
                ? '/login-illustration-dark_bg_removed.png'
                : '/login-illustration-light_bg_removed.png'
            }
            alt="Illustrazione login"
            width={260}
            height={260}
            className="object-contain"
            priority
          />
        </motion.div>
      ) : (
        <>
          <nav className="flex flex-col space-y-4">
            <Link
              href="/dashboard"
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors',
                pathname === '/dashboard' &&
                  'bg-gray-300 dark:bg-gray-800 font-semibold',
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/expenses"
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors',
                pathname === '/expenses' &&
                  'bg-gray-300 dark:bg-gray-800 font-semibold',
              )}
            >
              Spese
            </Link>
          </nav>

          <div className="mt-auto flex items-center justify-between">
            <button
              onClick={() => {signOut(auth)}}  
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition flex gap-2"  // Placeholder for logout function                      
            ><div>Logout</div><LogOutIcon></LogOutIcon></button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {theme === 'light' ? (
                <MoonIcon className="w-5 h-5 text-gray-800" />
              ) : (
                <SunIcon className="w-5 h-5 text-yellow-300" />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}