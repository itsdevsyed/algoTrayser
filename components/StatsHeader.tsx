"use client";

import { Code2, Moon, Sun } from "lucide-react";

interface StatsHeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function StatsHeader({ isDarkMode, setIsDarkMode }: StatsHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-800">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            AlgoPlayer
          </h1>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-md">
          Master algorithmic patterns with curated lists from Blind 75 and NeetCode 150.
        </p>
      </div>

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="self-start sm:self-auto p-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
      >
        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </header>
  );
}
