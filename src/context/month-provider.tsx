'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type SelectedMonthContextType = {
  selectedMonth: string; // formato: "YYYY-MM"
  setSelectedMonth: (month: string) => void;
};

const SelectedMonthContext = createContext<SelectedMonthContextType | undefined>(undefined);

export const SelectedMonthProvider = ({ children }: { children: ReactNode }) => {
  const currentMonth = new Date().toISOString().slice(0, 7); // formato "YYYY-MM"
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);

  return (
    <SelectedMonthContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      {children}
    </SelectedMonthContext.Provider>
  );
};

export const useSelectedMonth = (): SelectedMonthContextType => {
  const context = useContext(SelectedMonthContext);
  if (!context) {
    throw new Error('useSelectedMonth deve essere usato all’interno di SelectedMonthProvider');
  }
  return context;
};