// @/utils/algoEngine.ts

interface ExecutionStep {
    line: number;
    pointers: Record<string, number>;
    arrayState: number[];
    highlights: number[];
    hashmap: Record<string, number>;
    explanation: string;
  }

  export function generateTwoSumSteps(nums: number[], target: number) {
    const steps: ExecutionStep[] = [];
    const map: Record<string, number> = {};

    for (let i = 0; i < nums.length; i++) {
      const val = nums[i];
      const complement = target - val;

      // STEP A: Inspecting the current index line (Equivalent to Line 3/4)
      steps.push({
        line: 3,
        pointers: { i },
        arrayState: [...nums],
        highlights: [i],
        hashmap: { ...map },
        explanation: `Target is ${target}. Checking index ${i} (Value: ${val}). Complement needed: ${target} - ${val} = ${complement}. Looking up ${complement} in HashMap...`
      });

      // Check if map contains the complement
      if (complement in map) {
        const complementIdx = map[complement];

        // STEP B: Found a match! (Equivalent to Line 5)
        steps.push({
          line: 5,
          pointers: { i },
          arrayState: [...nums],
          highlights: [complementIdx, i],
          hashmap: { ...map },
          explanation: `Match found! The complement '${complement}' exists in our HashMap at index ${complementIdx}. Returning indices: [${complementIdx}, ${i}].`
        });

        return { steps, codeLanguage: "javascript", success: true };
      }

      // STEP C: Storing current item in map (Equivalent to Line 8)
      map[val.toString()] = i;
      steps.push({
        line: 8,
        pointers: { i },
        arrayState: [...nums],
        highlights: [i],
        hashmap: { ...map },
        explanation: `Storing value ${val} with its index ${i} into the HashMap. Advancing loop pointer.`
      });
    }

    // Fallback step if no matching pair exists
    steps.push({
      line: 10,
      pointers: {},
      arrayState: [...nums],
      highlights: [],
      hashmap: { ...map },
      explanation: "Loop finished execution. No two numbers sum up to the specified target value."
    });

    return { steps, codeLanguage: "javascript", success: false };
  }
