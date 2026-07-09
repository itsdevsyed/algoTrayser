// components/common/StatusBadge.tsx
import React from 'react';

interface StatusBadgeProps {
  status: 'idle' | 'running' | 'success' | 'error' | 'complete';
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className = '',
}) => {
  const statusConfig = {
    idle: {
      dot: 'bg-slate-400',
      dotAnimation: '',
      text: 'text-slate-500 dark:text-slate-400',
      label: label || 'Ready',
    },
    running: {
      dot: 'bg-sky-500',
      dotAnimation: 'animate-pulse',
      text: 'text-sky-600 dark:text-sky-400',
      label: label || 'Running',
    },
    success: {
      dot: 'bg-emerald-500',
      dotAnimation: 'animate-ping',
      text: 'text-emerald-600 dark:text-emerald-400',
      label: label || 'Success!',
    },
    error: {
      dot: 'bg-rose-500',
      dotAnimation: '',
      text: 'text-rose-600 dark:text-rose-400',
      label: label || 'Error',
    },
    complete: {
      dot: 'bg-emerald-500',
      dotAnimation: '',
      text: 'text-emerald-600 dark:text-emerald-400',
      label: label || 'Complete',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`inline-block w-2.5 h-2.5 rounded-full ${config.dot} ${config.dotAnimation}`} />
      <span className={`text-xs font-bold tracking-wider uppercase ${config.text}`}>
        {config.label}
      </span>
    </div>
  );
};
