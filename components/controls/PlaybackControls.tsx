// components/controls/PlaybackControls.tsx
import React from 'react';
import { SpeedControl } from '../common/SpeedControl';

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
          className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200"
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
          className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200"
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

      <SpeedControl speed={speed} onSpeedChange={onSpeedChange} />
    </div>
  );
};
