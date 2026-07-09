import { ProblemPattern } from '../types/patterns';
import { generateTwoSumTracer } from './tracers/twoSumTracer';
import { generateValidAnagramTracer } from './tracers/validAnagramTracer';

export const problemPatternMap: Record<string, ProblemPattern> = {
  // ============================================
  // TWO SUM PATTERN
  // ============================================
  'two-sum': {
    problemId: 'two-sum',
    pattern: 'two-sum',
    config: {
      inputType: 'array',
      requiresTarget: true,
    },
    tracer: generateTwoSumTracer,
    defaultInput: [2, 7, 11, 15],
    defaultTarget: 9,
  },

  // ============================================
  // VALID ANAGRAM PATTERN
  // ============================================
  'valid-anagram': {
    problemId: 'valid-anagram',
    pattern: 'valid-anagram',
    config: {
      inputType: 'string',
      requiresTarget: false,
    },
    tracer: generateValidAnagramTracer,
    defaultInput: ['anagram', 'nagaram'],
  },

  // ============================================
  // ✅ ADD MORE PATTERNS HERE AS YOU BUILD THEM
  // ============================================
  // 'contains-duplicate': {
  //   problemId: 'contains-duplicate',
  //   pattern: 'contains-duplicate',
  //   config: {
  //     inputType: 'array',
  //     requiresTarget: false,
  //   },
  //   tracer: generateContainsDuplicateTracer,
  //   defaultInput: [1, 2, 3, 1],
  // },
  //
  // 'valid-parentheses': {
  //   problemId: 'valid-parentheses',
  //   pattern: 'valid-parentheses',
  //   config: {
  //     inputType: 'string',
  //     requiresTarget: false,
  //   },
  //   tracer: generateValidParenthesesTracer,
  //   defaultInput: '()[]{}',
  // },
};

export const getProblemPattern = (problemId: string): ProblemPattern | null => {
  return problemPatternMap[problemId] || null;
};

export const getSupportedProblemIds = (): string[] => {
  return Object.keys(problemPatternMap);
};

export const hasVisualizer = (problemId: string): boolean => {
  return problemId in problemPatternMap;
};
