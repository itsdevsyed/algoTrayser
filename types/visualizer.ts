export interface VisualizerStep {
    line: number;                          // The exact line number to highlight in the code editor
    pointers: { [pointerName: string]: number }; // Active pointers and their index positions, e.g., { "i": 0, "left": 1 }
    arrayState: number[];                  // The current items in the array for this step frame
    highlights: number[];                  // Array indices that should blink or glow (e.g., [0, 1] when a match is found)
    explanation: string;                   // Text describing exactly what is happening right now in plain English
  }

  export interface AlgorithmConfig {
    language: string;                      // The coding language formatting, e.g., "javascript", "python", "java"
    code: string;                          // The raw code block layout string
    steps: VisualizerStep[];               // Array containing every animation snapshot frame
  }

  export interface ProblemData {
    id: string;                            // Unique url slug, e.g., "two-sum"
    title: string;                         // Presentable name, e.g., "Two Sum"
    difficulty: "Easy" | "Medium" | "Hard";// Difficulty badge utility
    optimal: AlgorithmConfig;              // The optimal solution visualization track
    bruteForce?: AlgorithmConfig;          // Optional brute-force solution visualization track
  }
