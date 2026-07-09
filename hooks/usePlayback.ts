// src/hooks/usePlayback.ts
import { useState, useEffect, useCallback, useRef } from 'react';

interface UsePlaybackProps {
  onNext: () => boolean;
  onPrev: () => boolean;
  onReset: () => void;
  isEnd: boolean;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export const usePlayback = ({
  onNext,
  onPrev,
  onReset,
  isEnd,
  speed,
  onSpeedChange
}: UsePlaybackProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startPlay = useCallback(() => {
    if (isEnd) {
      onReset();
    }
    setIsPlaying(true);
  }, [isEnd, onReset]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopPlay();
    } else {
      startPlay();
    }
  }, [isPlaying, stopPlay, startPlay]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        const hasNext = onNext();
        if (!hasNext) {
          stopPlay();
        }
      }, speed);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, onNext, speed, stopPlay]);

  useEffect(() => {
    if (isEnd && isPlaying) {
      stopPlay();
    }
  }, [isEnd, isPlaying, stopPlay]);

  return {
    isPlaying,
    togglePlay,
    stopPlay,
    startPlay,
    speed,
    onSpeedChange,
  };
};
