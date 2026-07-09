// components/layout/Header.tsx
import React from 'react';
import { ThemeToggle } from '../common/ThemeToggle';
import { Problem } from '../../types';

interface HeaderProps {
  problem?: Problem;
  onProblemChange?: (problemId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ problem, onProblemChange }) => {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <i className="fa-solid fa-calculator text-lg"></i>
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
              {problem?.title || 'DSA Visualizer'}
            </h1>
            {problem && (
              <span className={`text-[10px] uppercase tracking-widest font-bold ${
                problem.difficulty === 'Easy' ? 'text-emerald-500' :
                problem.difficulty === 'Medium' ? 'text-amber-500' : 'text-rose-500'
              }`}>
                {problem.difficulty} • {problem.pattern}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {problem && (
            <a
              href={`https://leetcode.com/problems/${problem.id}/`}
              target="_blank"
              className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-500 hover:bg-amber-500/20 transition-all border border-amber-500/20"
            >
              <i className="fa-solid fa-code"></i> LeetCode #{problem.id.split('-').pop()}
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
