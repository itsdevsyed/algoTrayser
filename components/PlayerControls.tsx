'use client';
import { useEffect } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';

export default function PlayerControls() {
  const {
    steps,
    currentStep,
    nextStep,
    prevStep,
    isPlaying,
  } = usePlayerStore();

  // Handle auto-playback interval loop when Play is active
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying && currentStep < steps.length - 1) {
      intervalId = setInterval(() => {
        nextStep();
      }, 1000); // Transitions steps every 1.0 second
    } else if (currentStep === steps.length - 1) {
      // Auto-pause when reaching the final frame snapshot
      usePlayerStore.setState({ isPlaying: false });
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, currentStep, steps.length, nextStep]);

  if (steps.length === 0) return null;

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">

      {/* Progress Metric Segment */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <div className="text-xs font-mono tracking-wide text-gray-400 uppercase select-none">
          Frame Sequence
        </div>
        <div className="text-xs font-mono text-gray-300 bg-[#0d0f17] border border-gray-800/60 px-2.5 py-1 rounded-md tabular-nums">
          <span className="text-indigo-400 font-semibold">{currentStep + 1}</span>
          <span className="text-gray-600 mx-1">/</span>
          <span>{steps.length}</span>
        </div>
      </div>

      {/* Center Execution Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="h-9 px-4 rounded-lg bg-gray-800/30 border border-gray-700/40 text-gray-300 hover:text-white hover:bg-gray-800/80 hover:border-gray-600/60 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-gray-300 disabled:hover:border-gray-700/40 text-xs font-mono tracking-wider uppercase transition-all duration-150"
        >
          Prev
        </button>

        <button
          onClick={() => usePlayerStore.setState({ isPlaying: !isPlaying })}
          className={`h-9 px-6 rounded-lg text-xs font-mono tracking-wider uppercase font-semibold transition-all duration-150 border ${
            isPlaying
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
              : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/20'
          }`}
        >
          {isPlaying ? 'Pause' : 'Run Automation'}
        </button>

        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="h-9 px-4 rounded-lg bg-gray-800/30 border border-gray-700/40 text-gray-300 hover:text-white hover:bg-gray-800/80 hover:border-gray-600/60 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-gray-300 disabled:hover:border-gray-700/40 text-xs font-mono tracking-wider uppercase transition-all duration-150"
        >
          Next
        </button>
      </div>

      {/* Visual Tracking Slider Segment */}
      <div className="w-full md:w-1/4 flex flex-col gap-1.5">
        <div className="w-full bg-[#0d0f17] border border-gray-800/60 h-2 rounded-full overflow-hidden p-[1px]">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

    </div>
  );
}
