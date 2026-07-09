// src/components/shared/ConfigPanel.tsx
'use client';

import React from 'react';

interface ConfigPanelProps {
  inputLabel: string;
  inputPlaceholder: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  targetLabel?: string;
  targetPlaceholder?: string;
  targetValue?: string;
  onTargetChange?: (value: string) => void;
  onApply: () => void;
  onRandom?: () => void;
  validationError?: string;
  className?: string;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  inputLabel,
  inputPlaceholder,
  inputValue,
  onInputChange,
  targetLabel,
  targetPlaceholder,
  targetValue,
  onTargetChange,
  onApply,
  onRandom,
  validationError,
  className = '',
}) => {
  return (
    <div className={`bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl transition-colors ${className}`}>
      <h3 className="text-md font-bold mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
        <i className="fa-solid fa-sliders text-sky-500"></i> Configure & Run
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            {inputLabel}
          </label>
          <input
            type="text"
            className="w-full text-sm rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-mono transition-colors"
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
          />
        </div>

        {targetLabel && onTargetChange && targetValue !== undefined && (
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              {targetLabel}
            </label>
            <input
              type="text"
              className="w-full text-sm rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-mono transition-colors"
              placeholder={targetPlaceholder}
              value={targetValue}
              onChange={(e) => onTargetChange(e.target.value)}
            />
          </div>
        )}

        {validationError && (
          <div className="text-xs bg-rose-500/10 text-rose-500 border border-rose-500/25 rounded-lg p-2.5 flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span>{validationError}</span>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={onApply}
            className="flex-1 text-xs font-bold py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-800"
          >
            <i className="fa-solid fa-arrows-rotate"></i> Apply Input
          </button>
          {onRandom && (
            <button
              onClick={onRandom}
              className="text-xs font-bold py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-800"
              title="Random Input"
            >
              <i className="fa-solid fa-dice"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
