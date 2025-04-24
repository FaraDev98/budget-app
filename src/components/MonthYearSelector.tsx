'use client';

import React, { useState } from 'react';
import { useSelectedMonth } from '@/context/month-provider';

const MonthYearSelector = () => {
  const { selectedMonth, setSelectedMonth } = useSelectedMonth();

  // Array dei mesi
  const months = [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
  ];

  // Anni disponibili (puoi personalizzarli)
  const years = Array.from({ length: 10 }, (_, i) => 2020 + i); 

  const [month, setMonth] = useState(parseInt(selectedMonth.split("-")[1], 10) - 1);
  const [year, setYear] = useState(parseInt(selectedMonth.split("-")[0], 10));

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;
    setMonth(months.indexOf(selectedMonth));
    setSelectedMonth(`${year}-${("0" + (months.indexOf(selectedMonth) + 1)).slice(-2)}`);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    setYear(parseInt(selectedYear, 10));
    setSelectedMonth(`${selectedYear}-${("0" + (month + 1)).slice(-2)}`);
  };

  return (
    <div className="flex items-center space-x-4">
      <div>
        <select
          value={months[month]}
          onChange={handleMonthChange}
          className="p-2 bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={year}
          onChange={handleYearChange}
          className="p-2 bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {years.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MonthYearSelector;