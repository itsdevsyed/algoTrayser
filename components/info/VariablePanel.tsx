import React from 'react';
import { Step } from '../../types';

interface VariablePanelProps {
  step: Step | null;
  className?: string;
  customVariables?: Record<string, { label: string; value: any; color?: string }>;
}

type VariableConfig = {
  label: string;
  value: any;
  color?: string;
};

export const VariablePanel: React.FC<VariablePanelProps> = ({
  step,
  className = '',
  customVariables,
}) => {
  const defaultVariables: Record<string, VariableConfig> = {
    i: {
      label: 'Index i',
      value: step?.i !== undefined && step.i !== -1 ? step.i : '-',
    },
    x: {
      label: 'Current Value',
      value: step?.value ?? '-',
    },
    complement: {
      label: 'Complement',
      value: step?.complement ?? '-',
    },
  };

  const variables: [string, VariableConfig][] = customVariables
    ? Object.entries(customVariables)
    : Object.entries(defaultVariables);

  return (
    <div
      className={`bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl transition-colors ${className}`}
    >
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center justify-between">
        <span>Current Variables</span>
        <i className="fa-solid fa-chart-simple text-sky-500"></i>
      </h3>

      <div className="space-y-3">
        {variables.map(([key, config]) => (
          <div
            key={key}
            className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-800 text-sm last:border-b-0"
          >
            <span className="text-slate-500 dark:text-slate-400 font-mono">
              {config.label}
            </span>

            <span className={`font-bold ${config.color ?? 'text-sky-500'} font-mono`}>
              {config.value !== undefined && config.value !== null
                ? String(config.value)
                : '-'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
