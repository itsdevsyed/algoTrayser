// src/components/shared/CodeTracer.tsx
'use client';

import React, { useState } from 'react';
import { CodeSnippet } from '../../types';

interface CodeTracerProps {
  snippets: CodeSnippet;
  highlightedLine: number;
  className?: string;
  defaultLanguage?: 'js' | 'py' | 'java';
}

export const CodeTracer: React.FC<CodeTracerProps> = ({
  snippets,
  highlightedLine,
  className = '',
  defaultLanguage = 'js',
}) => {
  const [language, setLanguage] = useState<'js' | 'py' | 'java'>(defaultLanguage);

  const languageMap = {
    js: { code: snippets.js, label: 'JavaScript' },
    py: { code: snippets.py, label: 'Python' },
    java: { code: snippets.java, label: 'Java' },
  };

  const currentCode = languageMap[language];

  return (
    <div className={`bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xl transition-colors ${className}`}>
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Code Tracer
        </span>
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-lg">
          {Object.entries(languageMap).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setLanguage(key as 'js' | 'py' | 'java')}
              className={`text-[10px] font-bold px-3 py-1.5 rounded transition-all ${
                language === key
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 font-mono text-xs leading-relaxed bg-slate-50/50 dark:bg-slate-950 overflow-x-auto min-h-[200px] max-h-[400px] overflow-y-auto">
        {currentCode.code.map((line, index) => {
          const lineNumber = index + 1;
          const isHighlighted = lineNumber === highlightedLine;

          return (
            <div
              key={index}
              className={`
                py-0.5 px-2 rounded transition-all duration-200 whitespace-pre
                ${isHighlighted
                  ? 'bg-sky-500/20 text-sky-900 dark:text-sky-100 border-l-4 border-sky-500 font-bold shadow-sm'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }
              `}
            >
              <span className="text-slate-400 dark:text-slate-600 mr-3 select-none inline-block w-6 text-right text-[10px]">
                {lineNumber}
              </span>
              <span dangerouslySetInnerHTML={{ __html: line }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
