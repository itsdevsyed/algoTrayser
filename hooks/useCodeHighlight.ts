// hooks/useCodeHighlight.ts
import { useState, useEffect, useCallback, useMemo } from 'react';

interface UseCodeHighlightProps {
  defaultLanguage?: 'js' | 'py' | 'java';
  onLanguageChange?: (language: string) => void;
}

export const useCodeHighlight = ({
  defaultLanguage = 'js',
  onLanguageChange,
}: UseCodeHighlightProps = {}) => {
  const [language, setLanguage] = useState<'js' | 'py' | 'java'>(defaultLanguage);
  const [highlightedLines, setHighlightedLines] = useState<Record<string, number>>({});

  const changeLanguage = useCallback((newLanguage: 'js' | 'py' | 'java') => {
    setLanguage(newLanguage);
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }
  }, [onLanguageChange]);

  const highlightLine = useCallback((lineNumber: number, lang?: string) => {
    const targetLang = lang || language;
    setHighlightedLines(prev => ({
      ...prev,
      [targetLang]: lineNumber,
    }));
  }, [language]);

  const clearHighlights = useCallback(() => {
    setHighlightedLines({});
  }, []);

  const getHighlightedLine = useCallback((lang?: string) => {
    const targetLang = lang || language;
    return highlightedLines[targetLang] || 0;
  }, [language, highlightedLines]);

  const lineToHighlight = useMemo(() => {
    return highlightedLines[language] || 0;
  }, [highlightedLines, language]);

  return {
    language,
    changeLanguage,
    highlightLine,
    clearHighlights,
    getHighlightedLine,
    lineToHighlight,
    languages: ['js', 'py', 'java'] as const,
  };
};
