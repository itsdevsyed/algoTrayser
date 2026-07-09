// app/visualize/[problemId]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

import blind75Data from '@/data/75-blind.json';
import neetcode150Data from '@/data/neetcode-150.json';

import { useVisualizer } from '@/hooks/useVisualizer';
import { usePlayback } from '@/hooks/usePlayback';
import { useTheme } from '@/hooks/useTheme';

import { ConfigPanel } from '@/components/shared/ConfigPanel';
import { PlaybackControls } from '@/components/shared/PlaybackControls';
import { StepCommentary } from '@/components/shared/StepCommentary';
import { VariablePanel } from '@/components/shared/VariablePanel';
import { CodeTracer } from '@/components/shared/CodeTracer';

import { TwoSumVisualizer } from '@/components/visualization/patterns/TwoSumVisualizer';
import { ValidAnagramVisualizer } from '@/components/visualization/patterns/ValidAnagramVisualizer';

import { twoSumCodeSnippets } from '@/utils/codeSnippets/twoSum';
import { validAnagramCodeSnippets } from '@/utils/codeSnippets/validAnagram';

import { getProblemPattern } from '@/utils/patternMapper';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  desc: string;
  source?: 'blind75' | 'neetcode150' | 'custom';
}

const patternVisualizers: Record<string, any> = {
  'two-sum': TwoSumVisualizer,
  'valid-anagram': ValidAnagramVisualizer,
};

const patternCodeSnippets: Record<string, any> = {
  'two-sum': twoSumCodeSnippets,
  'valid-anagram': validAnagramCodeSnippets,
};

export default function VisualizeProblemPage() {
  const params = useParams();
  const router = useRouter();
  const problemId = params.problemId as string;

  const { theme } = useTheme();

  const [inputStr, setInputStr] = useState('');
  const [targetStr, setTargetStr] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [speed, setSpeed] = useState(1200);
  const [problem, setProblem] = useState<Problem | null>(null);

  useEffect(() => {
    const allProblems = [...blind75Data, ...neetcode150Data];
    const foundProblem = allProblems.find((p: any) => p.id === problemId);
    if (foundProblem) {
      setProblem(foundProblem as Problem);
    }
  }, [problemId]);

  const pattern = useMemo(() => {
    return getProblemPattern(problemId);
  }, [problemId]);

  const dummyTracer = (input: any, target?: any) => {
    return [{
      type: 'init' as const,
      i: -1,
      mapState: {},
      highlightLines: { js: 3, py: 3, java: 3 },
      title: 'Loading...',
      desc: 'Visualizer is being loaded.'
    }];
  };

  const visualizer = useVisualizer(
    pattern?.tracer || dummyTracer,
    pattern?.defaultInput || [],
    pattern?.defaultTarget
  );

  const playback = usePlayback({
    onNext: visualizer.goToNext,
    onPrev: visualizer.goToPrev,
    onReset: visualizer.reset,
    isEnd: visualizer.currentStepIndex >= visualizer.totalSteps - 1,
    speed,
    onSpeedChange: setSpeed,
  });

  useEffect(() => {
    if (pattern?.defaultInput) {
      if (Array.isArray(pattern.defaultInput) && pattern.defaultInput.every(item => typeof item === 'string')) {
        setInputStr(pattern.defaultInput.join(', '));
      } else {
        setInputStr(Array.isArray(pattern.defaultInput)
          ? pattern.defaultInput.join(', ')
          : String(pattern.defaultInput)
        );
      }
    }
    if (pattern?.defaultTarget !== undefined) {
      setTargetStr(String(pattern.defaultTarget));
    }
  }, [pattern]);

  if (!problem) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Problem Not Found</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
            The problem you're looking for doesn't exist in our database.
          </p>
          <Link href="/" className="px-5 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium text-sm flex items-center justify-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  if (!pattern) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🚧</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Visualizer Coming Soon</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
            The visualizer for <strong className="text-slate-700 dark:text-slate-300">{problem.title}</strong> is currently being built.
          </p>
          <Link href="/" className="px-5 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors font-medium text-sm flex items-center justify-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  const VisualizerComponent = patternVisualizers[pattern.pattern] || TwoSumVisualizer;
  const CodeSnippets = patternCodeSnippets[pattern.pattern] || twoSumCodeSnippets;

  // ✅ FIXED: handleApply with proper string handling
  const handleApply = () => {
    let input: any;
    let target: number | undefined;

    if (pattern.config.inputType === 'string') {
      // Split by comma and trim
      const parts = inputStr.split(',').map(s => s.trim());

      // If there are 2 parts, use as [s, t] for anagram
      if (parts.length === 2 && parts[0] && parts[1]) {
        input = parts;
      }
      // If single string, use as is
      else if (parts.length === 1 && parts[0]) {
        input = parts[0];
      }
      else {
        setValidationError('Please enter valid strings (e.g., "anagram, nagaram")');
        return;
      }
    }
    else if (pattern.config.inputType === 'array') {
      input = inputStr.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
      if (input.length === 0) {
        setValidationError('Please enter valid numbers');
        return;
      }
    }
    else if (pattern.config.inputType === 'number') {
      input = parseInt(inputStr);
      if (isNaN(input)) {
        setValidationError('Please enter a valid number');
        return;
      }
    }
    else {
      input = inputStr;
    }

    if (pattern.config.requiresTarget) {
      target = parseInt(targetStr);
      if (isNaN(target)) {
        setValidationError('Please enter a valid target');
        return;
      }
    }

    setValidationError(null);
    visualizer.updateInput(input, target);
  };

  const handleRandom = () => {
    let input: any;
    let target: number | undefined;

    if (pattern.config.inputType === 'array') {
      const size = Math.floor(Math.random() * 8) + 4;
      input = Array.from({ length: size }, () => Math.floor(Math.random() * 20) - 5);
      if (pattern.config.requiresTarget) {
        const idx1 = Math.floor(Math.random() * size);
        let idx2 = Math.floor(Math.random() * size);
        while (idx1 === idx2) idx2 = Math.floor(Math.random() * size);
        target = input[idx1] + input[idx2];
      }
    } else if (pattern.config.inputType === 'string') {
      const wordPairs = [
        ['listen', 'silent'],
        ['anagram', 'nagaram'],
        ['rat', 'car'],
        ['evil', 'vile'],
        ['live', 'veil'],
        ['angel', 'glean'],
        ['race', 'care'],
        ['heart', 'earth'],
        ['stone', 'tones'],
        ['part', 'trap']
      ];
      const pair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
      input = pair;
    } else if (pattern.config.inputType === 'number') {
      input = Math.floor(Math.random() * 10) + 1;
    }

    setInputStr(Array.isArray(input) ? input.join(', ') : String(input));
    if (target !== undefined) setTargetStr(String(target));
    visualizer.updateInput(input, target);
    setValidationError(null);
  };

  const currentStep = visualizer.currentStep;

  const difficultyColor = {
    Easy: 'text-emerald-500 bg-emerald-500/10',
    Medium: 'text-amber-500 bg-amber-500/10',
    Hard: 'text-rose-500 bg-rose-500/10',
  };

  return (
    <div className={`${theme} min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300`}>
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </Link>
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                {problem.title}
              </h1>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${difficultyColor[problem.difficulty]}`}>
                {problem.difficulty}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={visualizer.reset} className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <i className="fa-solid fa-rotate-left"></i>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 shadow-xl">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-700 dark:text-slate-200">Problem:</span> {problem.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                    currentStep?.type === 'match' ? 'bg-emerald-500 animate-ping' :
                    currentStep?.type === 'no-solution' ? 'bg-rose-500' :
                    'bg-sky-500 animate-pulse'
                  }`} />
                  <span className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                    {currentStep?.type || 'Ready'}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Step: <span className="font-bold text-sky-500">{visualizer.currentStepIndex}</span> / <span className="font-bold">{visualizer.totalSteps - 1}</span>
                </div>
              </div>

              <div className="py-4 min-h-[300px]">
                <VisualizerComponent
                  step={currentStep}
                  input={visualizer.input}
                  target={visualizer.target}
                />
              </div>

              <PlaybackControls
                onPrev={visualizer.goToPrev}
                onNext={visualizer.goToNext}
                onPlay={playback.togglePlay}
                onReset={visualizer.reset}
                isPlaying={playback.isPlaying}
                currentStep={visualizer.currentStepIndex}
                totalSteps={visualizer.totalSteps}
                speed={speed}
                onSpeedChange={setSpeed}
              />
            </div>

            <StepCommentary step={currentStep} />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <ConfigPanel
              inputLabel={`Input (${pattern.config.inputType}):`}
              inputPlaceholder={
                pattern.config.inputType === 'array' ? '1, 2, 3, 4' :
                pattern.config.inputType === 'string' ? 'anagram, nagaram' :
                pattern.config.inputType === 'number' ? '5' : 'Enter input'
              }
              inputValue={inputStr}
              onInputChange={setInputStr}
              targetLabel={pattern.config.requiresTarget ? 'Target:' : undefined}
              targetPlaceholder="9"
              targetValue={pattern.config.requiresTarget ? targetStr : undefined}
              onTargetChange={pattern.config.requiresTarget ? setTargetStr : undefined}
              onApply={handleApply}
              onRandom={handleRandom}
              validationError={validationError || undefined}
            />

            <CodeTracer
              snippets={CodeSnippets}
              highlightedLine={currentStep?.highlightLines?.js || 0}
              defaultLanguage="js"
            />

            <VariablePanel step={currentStep} />
          </div>
        </div>
      </main>
    </div>
  );
}
