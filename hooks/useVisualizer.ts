// src/hooks/useVisualizer.ts
import { useState, useCallback, useMemo } from 'react';
import { Step } from '../types';

export const useVisualizer = (
  tracerFn: (input: any, target?: any) => Step[],
  initialInput: any = [],
  initialTarget?: any
) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [input, setInput] = useState(initialInput);
  const [target, setTarget] = useState(initialTarget);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateSteps = useCallback((newInput: any, newTarget?: any) => {
    const newSteps = tracerFn(newInput, newTarget);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    return newSteps;
  }, [tracerFn]);

  const currentStep = useMemo(() => {
    return steps[currentStepIndex] || null;
  }, [steps, currentStepIndex]);

  const goToStep = useCallback((index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
      return true;
    }
    return false;
  }, [steps.length]);

  const goToNext = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      return true;
    }
    return false;
  }, [currentStepIndex, steps.length]);

  const goToPrev = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      return true;
    }
    return false;
  }, [currentStepIndex]);

  const reset = useCallback(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const updateInput = useCallback((newInput: any, newTarget?: any) => {
    setInput(newInput);
    if (newTarget !== undefined) setTarget(newTarget);
    generateSteps(newInput, newTarget);
  }, [generateSteps]);

  return {
    steps,
    currentStep,
    currentStepIndex,
    totalSteps: steps.length,
    input,
    target,
    isPlaying,
    generateSteps,
    goToStep,
    goToNext,
    goToPrev,
    reset,
    togglePlay,
    updateInput,
    setTarget,
  };
};
