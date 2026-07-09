// hooks/useStepHistory.ts
import { useState, useCallback, useMemo } from 'react';
import { Step } from '../types';

interface UseStepHistoryProps {
  steps: Step[];
  initialIndex?: number;
  onStepChange?: (step: Step, index: number) => void;
}

export const useStepHistory = ({
  steps,
  initialIndex = 0,
  onStepChange,
}: UseStepHistoryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [history, setHistory] = useState<number[]>([initialIndex]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const currentStep = useMemo(() => {
    return steps[currentIndex] || null;
  }, [steps, currentIndex]);

  const goToStep = useCallback((index: number) => {
    if (index < 0 || index >= steps.length) return false;

    setCurrentIndex(index);

    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(index);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    if (onStepChange && steps[index]) {
      onStepChange(steps[index], index);
    }

    return true;
  }, [steps, history, historyIndex, onStepChange]);

  const goToNext = useCallback(() => {
    if (currentIndex < steps.length - 1) {
      return goToStep(currentIndex + 1);
    }
    return false;
  }, [currentIndex, steps.length, goToStep]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      return goToStep(currentIndex - 1);
    }
    return false;
  }, [currentIndex, goToStep]);

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = history[historyIndex - 1];
      setCurrentIndex(prevIndex);
      setHistoryIndex(historyIndex - 1);

      if (onStepChange && steps[prevIndex]) {
        onStepChange(steps[prevIndex], prevIndex);
      }
      return true;
    }
    return false;
  }, [history, historyIndex, steps, onStepChange]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = history[historyIndex + 1];
      setCurrentIndex(nextIndex);
      setHistoryIndex(historyIndex + 1);

      if (onStepChange && steps[nextIndex]) {
        onStepChange(steps[nextIndex], nextIndex);
      }
      return true;
    }
    return false;
  }, [history, historyIndex, steps, onStepChange]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setHistory([0]);
    setHistoryIndex(0);

    if (onStepChange && steps[0]) {
      onStepChange(steps[0], 0);
    }
  }, [steps, onStepChange]);

  const canGoBack = useMemo(() => historyIndex > 0, [historyIndex]);
  const canGoForward = useMemo(() => historyIndex < history.length - 1, [historyIndex, history.length]);

  return {
    currentStep,
    currentIndex,
    goToStep,
    goToNext,
    goToPrev,
    goBack,
    goForward,
    reset,
    canGoBack,
    canGoForward,
    totalSteps: steps.length,
    history,
    historyIndex,
  };
};
