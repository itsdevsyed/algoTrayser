// components/info/StepCommentary.tsx
import React from 'react';
import { Step } from '../../types';

interface StepCommentaryProps {
  step: Step | null;
  className?: string;
}

export const StepCommentary: React.FC<StepCommentaryProps> = ({ step, className = '' }) => {
  if (!step) {
    return (
      <div className={`bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl transition-colors ${className}`}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center justify-between">
          <span>Execution Commentary</span>
          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-sky-500 lowercase font-mono">waiting</span>
        </h3>
        <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">No step to display. Click "Play" or use step buttons to start.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl transition-colors ${className}`}>
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center justify-between">
        <span>Execution Commentary</span>
        <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-sky-500 lowercase font-mono">live tracing</span>
      </h3>
      <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
            <i className="fa-solid fa-comment-dots"></i>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">{step.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />

            {step.variables && Object.keys(step.variables).length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(step.variables).map(([key, value]) => (
                  <span key={key} className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {key}: <span className="font-bold text-sky-500">{String(value)}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
