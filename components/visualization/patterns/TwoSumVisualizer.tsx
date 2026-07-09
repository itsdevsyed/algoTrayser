// src/components/visualizers/patterns/TwoSumVisualizer.tsx
'use client';

import { Step } from '../../../types';
import { ArrayVisualizer } from '../../visualization/ArrayVisualizer';
import { HashMapVisualizer } from '../../visualization/HashMapVisualizer';

interface TwoSumVisualizerProps {
  step: Step | null;
  input: any[];
  target?: any;
}

export const TwoSumVisualizer: React.FC<TwoSumVisualizerProps> = ({ step, input, target }) => {
  if (!step) return null;

  const highlightIndices = [];
  if (step.type === 'match') {
    highlightIndices.push(step.i, step.j);
  }

  const pointerIndices = step.i >= 0 && step.i < input.length ? [step.i] : [];

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <i className="fa-solid fa-list-ol text-indigo-500"></i> Input Array
          </span>
        </div>
        <ArrayVisualizer
          data={input}
          highlightIndices={highlightIndices}
          pointerIndices={pointerIndices}
          pointerLabels={['i']}
        />
      </div>

      <div className="relative flex items-center justify-center my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-dashed border-slate-200 dark:border-slate-800"></div>
        </div>
        <div className="relative bg-white dark:bg-[#0f172a] px-4 py-1 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-full">
          Target ({target}) - Value ({step.value ?? '?'}) = Complement ({step.complement ?? '?'})
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <i className="fa-solid fa-database text-sky-500"></i> Hash Map
          </span>
        </div>
        <HashMapVisualizer
          mapState={step.mapState || {}}
          highlightKey={step.value}
          matchKey={step.complement}
        />
      </div>
    </div>
  );
};
