// src/components/shared/PlaybackControls.tsx
'use client';

import React from 'react';

interface PlaybackControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onPlay: () => void;
  onReset: () => void;
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onSpeedChange: (speed: number) => void;
  className?: string;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  onPrev,
  onNext,
  onPlay,
  onReset,
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onSpeedChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Step Backward"
          disabled={currentStep <= 0}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          onClick={onPlay}
          className={`px-5 py-2.5 rounded-lg transition-colors text-white font-bold flex items-center gap-2 shadow-lg ${
            isPlaying
              ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'
              : 'bg-sky-500 hover:bg-sky-600 shadow-sky-500/20'
          }`}
          title={isPlaying ? "Pause" : "Auto Play"}
        >
          <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>
        <button
          onClick={onNext}
          className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Step Forward"
          disabled={currentStep >= totalSteps - 1}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <button
          onClick={onReset}
          className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200"
          title="Reset Simulation"
        >
          <i className="fa-solid fa-rotate-left"></i>
        </button>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
          <i className="fa-solid fa-gauge-high"></i> Speed:
        </span>
        <input
          type="range"
          min={300}
          max={2500}
          step={100}
          value={speed}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          className="w-full sm:w-36 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
        />
        <span className="text-xs font-mono font-bold text-sky-500 dark:text-sky-400 w-12 text-right">
          {(speed / 1000).toFixed(1)}s
        </span>
      </div>
    </div>
  );
};
