// components/visualization/HashSetVisualizer.tsx
import React from 'react';

interface HashSetVisualizerProps {
  setState: Set<any>;
  highlightValue?: any;
  matchValue?: any;
  emptyMessage?: string;
  className?: string;
  valueFormatter?: (value: any) => string;
}

export const HashSetVisualizer: React.FC<HashSetVisualizerProps> = ({
  setState,
  highlightValue,
  matchValue,
  emptyMessage = 'HashSet is empty. No elements tracked yet.',
  className = '',
  valueFormatter = (v) => String(v),
}) => {
  const values = Array.from(setState);

  if (values.length === 0) {
    return (
      <div className={`p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 ${className}`}>
        <p className="text-xs text-slate-500 italic w-full text-center py-2">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2 items-center justify-start min-h-[60px] p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 ${className}`}>
      {values.map((value) => {
        const isHighlight = String(value) === String(highlightValue);
        const isMatch = String(value) === String(matchValue);

        return (
          <div
            key={String(value)}
            className={`
              px-3 py-2 rounded-lg border text-xs font-mono flex items-center gap-2 transition-all duration-300
              ${isMatch
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold scale-110 shadow-md'
                : isHighlight
                  ? 'bg-violet-500/10 border-violet-500 text-violet-600 dark:text-violet-400 font-bold scale-105'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }
            `}
          >
            <span className="text-amber-600 dark:text-amber-400 font-extrabold">{valueFormatter(value)}</span>
          </div>
        );
      })}
    </div>
  );
};
