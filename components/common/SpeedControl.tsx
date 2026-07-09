// components/common/SpeedControl.tsx
import React from 'react';

interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export const SpeedControl: React.FC<SpeedControlProps> = ({
  speed,
  onSpeedChange,
  min = 300,
  max = 2500,
  step = 100,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 w-full sm:w-auto ${className}`}>
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
        <i className="fa-solid fa-gauge-high"></i> Speed:
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={speed}
        onChange={(e) => onSpeedChange(parseInt(e.target.value))}
        className="w-full sm:w-36 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
      />
      <span className="text-xs font-mono font-bold text-sky-500 dark:text-sky-400 w-12 text-right">
        {(speed / 1000).toFixed(1)}s
      </span>
    </div>
  );
};
