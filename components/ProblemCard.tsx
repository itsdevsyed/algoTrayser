// components/ProblemCard.tsx
'use client';

import Link from 'next/link';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  desc: string;
  source?: 'blind75' | 'neetcode150' | 'custom';
}

interface ProblemCardProps {
  problem: Problem;
  activeTab: string;
  onRemove?: (id: string, e: React.MouseEvent) => void;
}

export default function ProblemCard({ problem, activeTab, onRemove }: ProblemCardProps) {
  const difficultyColor = {
    Easy: 'text-emerald-500 bg-emerald-500/10',
    Medium: 'text-amber-500 bg-amber-500/10',
    Hard: 'text-rose-500 bg-rose-500/10',
  };

  return (
    <div className="group relative bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-white truncate">
              {problem.title}
            </h3>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${difficultyColor[problem.difficulty]}`}>
              {problem.difficulty}
            </span>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
              {problem.category}
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
            {problem.desc}
          </p>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {/* Visualize Button */}
          <Link
            href={`/visualize/${problem.id}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 transition-all border border-sky-500/20 flex items-center gap-1.5 whitespace-nowrap"
          >
            <i className="fa-solid fa-play text-[10px]"></i> Visualize
          </Link>

          {activeTab === 'custom' && onRemove && (
            <button
              onClick={(e) => onRemove(problem.id, e)}
              className="text-xs text-neutral-400 hover:text-rose-500 transition-colors p-1.5 rounded-lg hover:bg-rose-500/10"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
