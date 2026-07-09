// components/visualization/HashMapVisualizer.tsx
import React from 'react';

interface HashMapVisualizerProps {
  mapState: Record<string, any>;
  highlightKey?: string | number;
  matchKey?: string | number;
  emptyMessage?: string;
  className?: string;
  valueFormatter?: (value: any) => string;
  keyFormatter?: (key: string) => string;
}

export const HashMapVisualizer: React.FC<HashMapVisualizerProps> = ({
  mapState,
  highlightKey,
  matchKey,
  emptyMessage = 'Hashmap is empty. No elements tracked yet.',
  className = '',
  valueFormatter = (v) => String(v),
  keyFormatter = (k) => String(k),
}) => {
  const keys = Object.keys(mapState);

  if (keys.length === 0) {
    return (
      <div className={`p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 ${className}`}>
        <p className="text-xs text-slate-500 italic w-full text-center py-2">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2 items-center justify-start min-h-[60px] p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 ${className}`}>
      {keys.map((key) => {
        const value = mapState[key];
        const isHighlight = String(key) === String(highlightKey);
        const isMatch = String(key) === String(matchKey);

        return (
          <div
            key={key}
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
            <span className="text-amber-600 dark:text-amber-400 font-extrabold">{keyFormatter(key)}</span>
            <span className="text-slate-400 dark:text-slate-500">:</span>
            <span className="text-sky-600 dark:text-sky-400 font-bold">{valueFormatter(value)}</span>
          </div>
        );
      })}
    </div>
  );
};
