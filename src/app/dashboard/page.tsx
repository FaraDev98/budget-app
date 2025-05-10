// src/app/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/protected-route";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#4B0082"];

export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [expenses, setExpenses] = useState<any>([]);
  const [income, setIncome] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalExpenses = expenses.reduce((sum: any, exp: { amount: any; }) => sum + exp.amount, 0);
  const residual = parseFloat(income || "0") - totalExpenses;

  const categoryData = Object.entries(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expenses.reduce((acc: { [x: string]: any; }, curr: { category: string | number; amount: any; }) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  useEffect(() => {
    setExpenses([{ "description": "Spesa 1", "amount": 50, "category": "Alimentari" }, { "description": "Spesa 2", "amount": 30, "category": "Trasporti" }]);
  }
    , []);

  return (
    <>
      <ProtectedRoute>

      <div className="p-4">
        <div>
          <Navbar />
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <Card className="h-full">
              <CardContent className="space-y-2 h-full flex flex-col">
                <Label>Stipendio Ricevuto (€)</Label>
                <Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="Es. 1500" />
                <p>Totale Spese: <strong>€ {totalExpenses.toFixed(2)}</strong></p>
                <p>Residuo: <strong className={residual >= 0 ? 'text-green-600' : 'text-red-600'}>€ {residual.toFixed(2)}</strong></p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="h-full">
                <h2 className="text-xl font-semibold mb-2">Spese per Categoria</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

        </motion.div>
      </div>
      </ProtectedRoute>
    </>
  );
}