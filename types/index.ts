// src/types/index.ts
export interface Step {
  type: 'init' | 'read' | 'compute' | 'check' | 'insert' | 'match' | 'no-solution' | 'update' | 'swap' | 'compare' | 'move' | 'found' | 'not-found';
  i: number;
  j?: number;
  left?: number;
  right?: number;
  value?: any;
  complement?: any;
  mapState?: Record<string, any>;
  setState?: Set<any>;
  windowState?: {
    left: number;
    right: number;
    sum: number;
    max: number;
    currentWindow: any[];
  };
  highlightLines: Record<string, number>;
  title: string;
  desc: string;
  variables?: Record<string, any>;
  highlightIndices?: number[];
}

export interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  desc: string;
  source?: "blind75" | "neetcode150" | "custom";
}

export interface CodeSnippet {
  js: string[];
  py: string[];
  java: string[];
}
