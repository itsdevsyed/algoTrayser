// src/components/shared/VariablePanel.tsx
'use client';

import React from 'react';
import { Step } from '../../types';

interface VariablePanelProps {
  step: Step | null;
  className?: string;
  customVariables?: Record<string, { label: string; value: any; color?: string }>;
}

export const VariablePanel: React.FC<VariablePanelProps> = ({
  step,
  className = '',
  customVariables,
}) => {
  const defaultVariables = [
    { key: 'i', label: 'Index i', value: step?.i !== undefined && step.i !== -1 ? step.i : '-' },
    { key: 'value', label: 'Current Value', value: step?.value !== undefined ? step.value : '-' },
    { key: 'complement', label: 'Complement', value: step?.complement !== undefined ? step.complement : '-' },
  ];

  const variables = customVariables
    ? Object.entries(customVariables).map(([key, config]) => ({
        key,
        label: config.label,
        value: config.value,
        color: config.color || 'text-sky-500'
      }))
    : defaultVariables.map(v => ({ ...v, color: 'text-sky-500' }));

  return (
    <div className={`bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl transition-colors ${className}`}>
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center justify-between">
        <span>Current Variables</span>
        <i className="fa-solid fa-chart-simple text-sky-500"></i>
      </h3>

      <div className="space-y-3">
        {variables.map(({ key, label, value, color }) => (
          <div key={key} className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-800 text-sm last:border-b-0">
            <span className="text-slate-500 dark:text-slate-400 font-mono">{label}</span>
            <span className={`font-bold ${color} font-mono`}>
              {value !== undefined && value !== null ? String(value) : '-'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
