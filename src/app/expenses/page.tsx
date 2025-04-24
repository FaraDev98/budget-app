'use client';

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";// Importa l'icona Heroicon
import { SearchIcon } from "lucide-react";

export default function Expenses() {
  const [expenses, setExpenses] = useState([
    { description: "Spesa supermercato", amount: 45.90, category: "Alimentari", date: "2025-04-20" },
    { description: "Benzina", amount: 30.00, category: "Trasporti", date: "2025-04-21" },
    { description: "Internet", amount: 25.00, category: "Utenze", date: "2025-04-20" },
    { description: "Cinema", amount: 12.50, category: "Intrattenimento", date: "2025-04-22" },
    { description: "Cibo da asporto", amount: 20.00, category: "Alimentari", date: "2025-04-21" },
    { description: "Bollette", amount: 70.00, category: "Utenze", date: "2025-04-22" },
    { description: "Spesa farmacia", amount: 15.50, category: "Salute", date: "2025-04-22" },
    { description: "Parcheggio", amount: 5.00, category: "Trasporti", date: "2025-04-23" },
    { description: "Ristorante", amount: 50.00, category: "Alimentari", date: "2025-04-23" },
    { description: "Libri", amount: 35.00, category: "Istruzione", date: "2025-04-24" },
  ]);

  // Gestione barra di ricerca
  const [searchTerm, setSearchTerm] = useState(""); // Stato per la barra di ricerca

  const filteredExpenses = expenses.filter((expense) => {
    return (
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Ordinamento delle spese per data (dal più recente al più vecchio)
  const sortedExpenses = filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Gestione aggiunta spesa
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(""); // Stato per la data
  const [sidebarOpen, setSidebarOpen] = useState(false);  // Stato della sidebar

  const addExpense = () => {
    if (description && amount && category && date) {
      setExpenses([...expenses, { description, amount: parseFloat(amount), category, date }]);
      setDescription("");
      setAmount("");
      setCategory("");
      setDate(""); // Reset della data
    }
  };

  return (
    <div className="p-4 min-h-screen bg-background text-foreground relative">
      <Navbar />

      {/* Contenitore per il titolo e i pulsanti */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between items-center gap-4">
        {/* Barra di ricerca */}
        <div className="flex gap-4 items-center w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca per descrizione o categoria"
              className="p-3 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 border-2 dark:border-gray-600 text-gray-800 dark:text-white w-full pl-10"
            />
            <SearchIcon className="absolute left-3 top-3 text-gray-500 dark:text-gray-300 w-5 h-5" />
          </div>
          {/* Pulsante per aggiungere spesa */}
          <Button
            onClick={() => setSidebarOpen(true)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Aggiungi Spesa
          </Button>
        </div>
      </div>

      {/* Sidebar per aggiungere spesa */}
      {sidebarOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black/50" onClick={() => setSidebarOpen(false)} />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-800 shadow-lg p-6 z-50 transform ${sidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform ease-in-out duration-300 rounded-l-2xl`}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Aggiungi Spesa</h2>
        <div className="space-y-4">
          <div>
            <Label>Descrizione</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Es. Spesa supermercato"
              className="mt-2 p-3 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 border-2 dark:border-gray-600 text-gray-800 dark:text-white"
            />
          </div>
          <div>
            <Label>Importo (€)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Es. 45.90"
              className="mt-2 p-3 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 border-2 dark:border-gray-600 text-gray-800 dark:text-white"
            />
          </div>
          <div>
            <Label>Categoria</Label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Es. Alimentari"
              className="mt-2 p-3 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 border-2 dark:border-gray-600 text-gray-800 dark:text-white"
            />
          </div>
          <div>
            <Label>Data</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 p-3 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 border-2 dark:border-gray-600 text-gray-800 dark:text-white"
            />
          </div>
          <Button
            className="w-full mt-4 bg-green-600 text-white hover:bg-green-700"
            onClick={addExpense}
          >
            Aggiungi Spesa
          </Button>
        </div>
      </div>

      {/* Contenitore principale per le spese con scroll */}
      <div className="overflow-y-auto max-h-[calc(100vh-250px)] mt-8">
        {/* Visualizzazione delle spese ordinate */}
        <div className="space-y-6">
          {sortedExpenses.map((expense, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{expense.description}</h3>
              <p className="text-green-600 dark:text-green-400 font-semibold">€ {expense.amount.toFixed(2)}</p>
              <p className="text-gray-500 dark:text-gray-300">{expense.category}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{expense.date}</p> {/* Data aggiunta alla card */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
