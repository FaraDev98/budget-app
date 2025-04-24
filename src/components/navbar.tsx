import { CalendarIcon } from '@heroicons/react/24/outline';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/theme-provider';
import { MenuIcon, MoonIcon, SunIcon, XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import MonthYearSelector from './MonthYearSelector';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isSelectorVisible, setIsSelectorVisible] = useState(false); // Stato per visibilità del selettore

  const selectorRef = useRef<HTMLDivElement | null>(null);
  
  const pageTitle = useMemo(() => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/expenses':
        return 'Spese';
      default:
        return 'Budget App';
    }
  }, [pathname]);

  const handleMonthSelectorToggle = () => {
    setIsSelectorVisible(!isSelectorVisible); // Cambia la visibilità del selettore
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
      setIsSelectorVisible(false);
    }
  };

  useEffect(() => {
    // Aggiungi l'evento per rilevare i clic fuori dal selettore
    document.addEventListener('mousedown', handleClickOutside);

    // Pulisci l'evento quando il componente viene smontato
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav>
        <div className="flex items-center justify-between bg-transparent text-gray-900 dark:text-white py-3 my-4 border-b-2 border-b-blue-500 dark:border-b-blue-300">
          <h1 className="text-xl font-bold">{pageTitle}</h1>

          {/* Contenitore per selettore di mese e menu hamburger */}
          <div className="flex items-center gap-2 lg:gap-4 ml-auto">
            {/* Selettore del mese */}
            <div className="relative">
              <button
                onClick={handleMonthSelectorToggle}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                <CalendarIcon className="w-6 h-6 text-gray-800 dark:text-white" />
              </button>

              {/* Selettore del mese floating */}
              {isSelectorVisible && (
                <div className="absolute top-10 right-0 z-50 bg-white dark:bg-gray-900 shadow-md p-4 rounded-md" ref={selectorRef}>
                  
                  <MonthYearSelector />
                </div>
              )}
            </div>

            {/* Menu Hamburger con lo stesso stile del selettore data */}
            <div className="lg:hidden block">
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                <MenuIcon className="w-6 h-6 text-gray-800 dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer (menu a scomparsa) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg z-50 p-6 space-y-6 rounded-r-lg flex flex-col"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Menu</h2>
                <button onClick={() => setIsOpen(false)}>
                  <XIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300">
                  Dashboard
                </Link>
                <Link href="/expenses" onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300">
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
