// components/visualization/patterns/ValidAnagramVisualizer.tsx
'use client';

import { Step } from '@/types';
import { HashMapVisualizer } from '@/components/visualization/HashMapVisualizer';

interface ValidAnagramVisualizerProps {
  step: Step | null;
  input: any[];
  target?: any;
}

export const ValidAnagramVisualizer = ({ step, input }: ValidAnagramVisualizerProps) => {
  if (!step) return null;

  const s = input?.[0] || '';
  const t = input?.[1] || '';

  // ✅ Check for both match and no-solution types
  const isAnagram = step.type === 'match';
  const isNotAnagram = step.type === 'no-solution';

  // ✅ Also check if the step has a result in variables
  const stepResult = step.variables?.Result || '';
  const hasResult = stepResult.includes('true') || stepResult.includes('false');

  // ✅ If it's a no-solution with a mismatch, show false
  const showFalse = isNotAnagram || stepResult.includes('false');
  const showTrue = isAnagram || stepResult.includes('true');

  // ✅ Check if we're still in the middle of processing
  const isProcessing = !isAnagram && !isNotAnagram && !hasResult;

  return (
    <div className="space-y-10">
      {/* Display both strings */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            String 1 (s)
          </div>
          <div className="flex flex-wrap gap-2">
            {s.split('').map((char, idx) => (
              <div
                key={idx}
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  border-2 transition-all duration-300 font-bold text-sm
                  ${step.i === idx ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-white'}
                `}
              >
                {char}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            String 2 (t)
          </div>
          <div className="flex flex-wrap gap-2">
            {t.split('').map((char, idx) => (
              <div
                key={idx}
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  border-2 transition-all duration-300 font-bold text-sm
                  ${step.type === 'check' && idx === step.i ? 'border-amber-500 bg-amber-500/10 text-amber-500' :
                    step.type === 'no-solution' && idx === step.i ? 'border-rose-500 bg-rose-500/10 text-rose-500' :
                    'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-white'}
                `}
              >
                {char}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ SHOW RESULT - True/False */}
      <div className="flex justify-center">
        <div className={`
          px-6 py-3 rounded-xl text-center transition-all duration-300
          ${showTrue ? 'bg-emerald-500/20 border-2 border-emerald-500' :
            showFalse ? 'bg-rose-500/20 border-2 border-rose-500' :
            'bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700'}
        `}>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Result
          </div>
          <div className={`
            text-2xl font-bold mt-1
            ${showTrue ? 'text-emerald-500' :
              showFalse ? 'text-rose-500' :
              'text-slate-400'}
          `}>
            {showTrue ? '✅ true' :
             showFalse ? '❌ false' :
             '⏳ Checking...'}
          </div>
        </div>
      </div>

      {/* Hash Map Display */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <i className="fa-solid fa-database text-sky-500"></i> Character Count Map
          </span>
        </div>
        <HashMapVisualizer
          mapState={step.mapState || {}}
          highlightKey={step.value}
        />
      </div>

      {/* Flow Indicator */}
      <div className="relative flex items-center justify-center my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-dashed border-slate-200 dark:border-slate-800"></div>
        </div>
        <div className={`
          relative px-4 py-1 text-xs font-bold uppercase border rounded-full
          ${showTrue ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/50' :
            showFalse ? 'bg-rose-500/10 text-rose-500 border-rose-500/50' :
            'bg-white dark:bg-[#0f172a] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800'}
        `}>
          {showTrue ? '✅ Valid Anagram!' :
           showFalse ? '❌ Not an Anagram' :
           'Counting characters...'}
        </div>
      </div>
    </div>
  );
};
