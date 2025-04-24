'use client';
import { useTheme } from "@/context/theme-provider";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    return (
        <div
            className={`fixed top-0 left-0 w-96 h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg z-50 p-6 space-y-6 rounded-r-lg flex flex-col border-r-2
          ${alwaysVisible ? '' : 'fixed right-4 top-16 lg:hidden'}
        `}
        >
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Menu</h2>
            </div>

            <nav className="flex flex-col space-y-4">
                <Link href="/dashboard" className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                    pathname === "/dashboard" && "bg-gray-300 dark:bg-gray-800 font-semibold"
                )}>
                    Dashboard
                </Link>
                <Link href="/expenses" className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                    pathname === "/expenses" && "bg-gray-300 dark:bg-gray-800 font-semibold"
                )}>
                    Spese
                </Link>
            </nav>

            <div className="absolute bottom-6 right-6">
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
        </div>
    );
}