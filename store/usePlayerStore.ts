import { create } from 'zustand';
import { VisualizerStep } from '@/types/visualizer';

interface PlayerState {
  steps: VisualizerStep[];
  currentStep: number;
  isPlaying: boolean;
  codeSnippet: string;

  // Actions
  setProblemData: (steps: VisualizerStep[], codeSnippet: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  togglePlay: () => void;
  jumpToStep: (stepIndex: number) => void;
  resetPlayer: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  steps: [],
  currentStep: 0,
  isPlaying: false,
  codeSnippet: '',

  // Call this whenever a user switches between Brute Force and Optimal tabs
  setProblemData: (steps, codeSnippet) => set({
    steps,
    codeSnippet,
    currentStep: 0,
    isPlaying: false
  }),

  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, state.steps.length - 1)
  })),

  prevStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 0)
  })),

  togglePlay: () => set((state) => ({
    isPlaying: !state.isPlaying
  })),

  jumpToStep: (stepIndex) => set((state) => ({
    currentStep: Math.max(0, Math.min(stepIndex, state.steps.length - 1))
  })),

  resetPlayer: () => set({
    currentStep: 0,
    isPlaying: false
  }),
}));
