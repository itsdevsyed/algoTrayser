// src/utils/patternMapper.ts
import { ProblemPattern } from '../types/patterns';
import { generateTwoSumTracer } from './tracers/twoSumTracer';
import { generateValidAnagramTracer } from './tracers/validAnagramTracer';

// Import other tracers as you create them
// import { generateSlidingWindowTracer } from './tracers/slidingWindowTracer';
// import { generateTwoPointersTracer } from './tracers/twoPointersTracer';
// import { generateBinarySearchTracer } from './tracers/binarySearchTracer';
// import { generateLinkedListTracer } from './tracers/linkedListTracer';

/**
 * Map each problem ID to its pattern type and configuration
 *
 * This is the central registry that connects problems to their visualizers.
 * Each entry maps a problem ID to:
 * - pattern: The algorithm pattern (e.g., 'two-sum', 'sliding-window')
 * - config: Input type and required parameters
 * - tracer: The function that generates visualization steps
 * - defaultInput: Default input for the visualizer
 * - defaultTarget: Default target (if applicable)
 */
export const problemPatternMap: Record<string, ProblemPattern> = {
  // ============================================
  // TWO SUM PATTERN
  // ============================================
  'two-sum': {
    problemId: 'two-sum',
    pattern: 'two-sum',
    config: {
      inputType: 'string',
      requiresTarget: true,
    },
    tracer: generateTwoSumTracer,
    defaultInput: [2, 7, 11, 15],
    defaultTarget: 9,
  },
'valid-anagram': {
  problemId: 'valid-anagram',
  pattern: 'valid-anagram',  // ✅ Use unique pattern name
  config: {
    inputType: 'string',
    requiresTarget: false,
  },
  tracer: generateValidAnagramTracer,
  defaultInput: ['anagram', 'nagaram'],
},

  // Add more Two Sum variants
  // 'two-sum-ii': {
  //   problemId: 'two-sum-ii',
  //   pattern: 'two-sum',
  //   config: {
  //     inputType: 'array',
  //     requiresTarget: true,
  //   },
  //   tracer: generateTwoSumTracer,
  //   defaultInput: [2, 7, 11, 15],
  //   defaultTarget: 9,
  // },

  // ============================================
  // SLIDING WINDOW PATTERN
  // ============================================
  // 'longest-substring-without-repeating-characters': {
  //   problemId: 'longest-substring-without-repeating-characters',
  //   pattern: 'sliding-window',
  //   config: {
  //     inputType: 'string',
  //     requiresTarget: false,
  //   },
  //   tracer: generateSlidingWindowTracer,
  //   defaultInput: 'abcabcbb',
  // },

  // 'maximum-subarray': {
  //   problemId: 'maximum-subarray',
  //   pattern: 'sliding-window',
  //   config: {
  //     inputType: 'array',
  //     requiresTarget: false,
  //   },
  //   tracer: generateSlidingWindowTracer,
  //   defaultInput: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
  // },

  // ============================================
  // TWO POINTERS PATTERN
  // ============================================
  // '3sum': {
  //   problemId: '3sum',
  //   pattern: 'two-pointers',
  //   config: {
  //     inputType: 'array',
  //     requiresTarget: true,
  //   },
  //   tracer: generateTwoPointersTracer,
  //   defaultInput: [-1, 0, 1, 2, -1, -4],
  //   defaultTarget: 0,
  // },

  // 'container-with-most-water': {
  //   problemId: 'container-with-most-water',
  //   pattern: 'two-pointers',
  //   config: {
  //     inputType: 'array',
  //     requiresTarget: false,
  //   },
  //   tracer: generateTwoPointersTracer,
  //   defaultInput: [1, 8, 6, 2, 5, 4, 8, 3, 7],
  // },

  // ============================================
  // BINARY SEARCH PATTERN
  // ============================================
  // 'binary-search': {
  //   problemId: 'binary-search',
  //   pattern: 'binary-search',
  //   config: {
  //     inputType: 'array',
  //     requiresTarget: true,
  //   },
  //   tracer: generateBinarySearchTracer,
  //   defaultInput: [-1, 0, 3, 5, 9, 12],
  //   defaultTarget: 9,
  // },

  // 'search-in-rotated-sorted-array': {
  //   problemId: 'search-in-rotated-sorted-array',
  //   pattern: 'binary-search',
  //   config: {
  //     inputType: 'array',
  //     requiresTarget: true,
  //   },
  //   tracer: generateBinarySearchTracer,
  //   defaultInput: [4, 5, 6, 7, 0, 1, 2],
  //   defaultTarget: 0,
  // },

  // ============================================
  // LINKED LIST PATTERN
  // ============================================
  // 'reverse-linked-list': {
  //   problemId: 'reverse-linked-list',
  //   pattern: 'linked-list',
  //   config: {
  //     inputType: 'linked-list',
  //     requiresTarget: false,
  //   },
  //   tracer: generateLinkedListTracer,
  //   defaultInput: [1, 2, 3, 4, 5],
  // },

  // 'palindrome-linked-list': {
  //   problemId: 'palindrome-linked-list',
  //   pattern: 'linked-list',
  //   config: {
  //     inputType: 'linked-list',
  //     requiresTarget: false,
  //   },
  //   tracer: generateLinkedListTracer,
  //   defaultInput: [1, 2, 2, 1],
  // },

  // ============================================
  // ADD MORE PROBLEMS HERE AS YOU BUILD VISUALIZERS
  // ============================================
  // 'valid-parentheses': {
  //   problemId: 'valid-parentheses',
  //   pattern: 'stack',
  //   config: {
  //     inputType: 'string',
  //     requiresTarget: false,
  //   },
  //   tracer: generateStackTracer,
  //   defaultInput: '([)]',
  // },
};

/**
 * Get the pattern configuration for a specific problem
 * @param problemId - The ID of the problem (e.g., 'two-sum')
 * @returns The ProblemPattern configuration or null if not found
 */
export const getProblemPattern = (problemId: string): ProblemPattern | null => {
  return problemPatternMap[problemId] || null;
};

/**
 * Get all supported problem IDs
 * @returns Array of problem IDs that have visualizers
 */
export const getSupportedProblemIds = (): string[] => {
  return Object.keys(problemPatternMap);
};

/**
 * Check if a problem has a visualizer
 * @param problemId - The ID of the problem
 * @returns boolean indicating if a visualizer exists
 */
export const hasVisualizer = (problemId: string): boolean => {
  return problemId in problemPatternMap;
};
