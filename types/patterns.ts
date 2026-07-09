// src/types/patterns.ts
import { Step } from './index';

export type AlgorithmPattern =
  | 'two-sum'
  | 'valid-anagram'  // ✅ ADD THIS
  | 'sliding-window'
  | 'two-pointers'
  | 'binary-search'
  | 'linked-list'
  | 'stack'
  | 'queue'
  | 'tree-dfs'
  | 'tree-bfs'
  | 'graph'
  | 'dynamic-programming'
  | 'backtracking'
  | 'greedy'
  | 'merge-intervals'
  | 'cyclic-sort'
  | 'heap'
  | 'trie'
  | 'bit-manipulation'
  | 'math'
  | 'string-manipulation';

export interface ProblemPattern {
  problemId: string;
  pattern: AlgorithmPattern;
  config: {
    inputType: 'array' | 'linked-list' | 'tree' | 'graph' | 'string' | 'matrix' | 'number';
    requiresTarget?: boolean;
    requiresK?: boolean;
    requiresWindowSize?: boolean;
    requiresRoot?: boolean;
    additionalParams?: Record<string, any>;
  };
  tracer: (input: any, target?: any, config?: any) => Step[];
  defaultInput: any;
  defaultTarget?: any;
}
