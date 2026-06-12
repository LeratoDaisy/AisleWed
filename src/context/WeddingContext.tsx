import React, { createContext, useContext, useState } from 'react';

type Expense = {
  id: number;
  name: string;
  amount: number;
};

type Guest = {
  id: number;
  name: string;
  confirmed: boolean;
};

type Task = {
  id: number;
  title: string;
  done: boolean;
};

type WeddingState = {
  coupleName: string;
  weddingDate: string;

  budget: {
    total: number;
    expenses: Expense[];
  };

  guests: Guest[];
  tasks: Task[];
};

type WeddingContextType = {
  wedding: WeddingState;

  addExpense: (expense: Expense) => void;
  addGuest: (guest: Guest) => void;
  addTask: (task: Task) => void;

  toggleTask: (id: number) => void;
  toggleGuest: (id: number) => void;
};

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

const initialWedding: WeddingState = {
  coupleName: 'Lerato & Partner',
  weddingDate: '2026-12-15',

  budget: {
    total: 50000,
    expenses: [
      { id: 1, name: 'Venue Deposit', amount: 15000 },
    ],
  },

  guests: [
    { id: 1, name: 'Guest 1', confirmed: false },
  ],

  tasks: [
    { id: 1, title: 'Book venue', done: false },
  ],
};

export const WeddingProvider = ({ children }: { children: React.ReactNode }) => {
  const [wedding, setWedding] = useState<WeddingState>(initialWedding);

  const addExpense = (expense: Expense) => {
    setWedding((prev) => ({
      ...prev,
      budget: {
        ...prev.budget,
        expenses: [...prev.budget.expenses, expense],
      },
    }));
  };

  const addGuest = (guest: Guest) => {
    setWedding((prev) => ({
      ...prev,
      guests: [...prev.guests, guest],
    }));
  };

  const addTask = (task: Task) => {
    setWedding((prev) => ({
      ...prev,
      tasks: [...prev.tasks, task],
    }));
  };

  const toggleTask = (id: number) => {
    setWedding((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    }));
  };

  const toggleGuest = (id: number) => {
    setWedding((prev) => ({
      ...prev,
      guests: prev.guests.map((g) =>
        g.id === id ? { ...g, confirmed: !g.confirmed } : g
      ),
    }));
  };

  return (
    <WeddingContext.Provider
      value={{
        wedding,
        addExpense,
        addGuest,
        addTask,
        toggleTask,
        toggleGuest,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used inside WeddingProvider');
  }
  return context;
};