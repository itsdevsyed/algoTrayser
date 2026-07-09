// @/utils/algorithmEngine.ts

export interface VisualStep {
  line: number;
  pointers: Record<string, number>;
  arrayState: number[];
  highlights: number[];
  hashmap?: Record<string, number>; // Optional: Only used for Hashmap problems
  explanation: string;
}

export interface SimulationResult {
  steps: VisualStep[];
  code: string;
}

// 1. JAVA TWO SUM SIMULATOR
function runJavaTwoSum(nums: number[], target: number): SimulationResult {
  const steps: VisualStep[] = [];
  const map: Record<string, number> = {};

  const javaCode = `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}`;

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    const complement = target - val;

    // Line 4: Calculating complement
    steps.push({
      line: 4,
      pointers: { i },
      arrayState: [...nums],
      highlights: [i],
      hashmap: { ...map },
      explanation: `Java Runtime: Evaluating index i = ${i} (value: ${val}). Calculating complement: ${target} - ${val} = ${complement}.`
    });

    // Line 5: map.containsKey lookup
    steps.push({
      line: 5,
      pointers: { i },
      arrayState: [...nums],
      highlights: [i],
      hashmap: { ...map },
      explanation: `Executing map.containsKey(${complement}). Searching inner buckets...`
    });

    if (complement in map) {
      const complementIdx = map[complement];
      // Line 6: Return match
      steps.push({
        line: 6,
        pointers: { i },
        arrayState: [...nums],
        highlights: [complementIdx, i],
        hashmap: { ...map },
        explanation: `Success! map.containsKey(${complement}) returned true (stored at index ${complementIdx}). Constructing return pair array: [${complementIdx}, ${i}].`
      });
      return { steps, code: javaCode };
    }

    // Line 8: map.put
    map[val.toString()] = i;
    steps.push({
      line: 8,
      pointers: { i },
      arrayState: [...nums],
      highlights: [i],
      hashmap: { ...map },
      explanation: `Executing map.put(${val}, ${i}). Storing key-value mapping to active memory frame.`
    });
  }

  return { steps, code: javaCode };
}

// 2. JAVA BINARY SEARCH SIMULATOR
function runJavaBinarySearch(nums: number[], target: number): SimulationResult {
  const steps: VisualStep[] = [];
  let left = 0;
  let right = nums.length - 1;

  const javaCode = `public int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    // Line 4: Calculate mid point state
    steps.push({
      line: 4,
      pointers: { left, right, mid },
      arrayState: [...nums],
      highlights: [mid],
      explanation: `Binary Search: Adjusting search pointers. Left index: ${left}, Right index: ${right}. Evaluating middle pivot index calculation mid = ${mid}.`
    });

    if (nums[mid] === target) {
      steps.push({
        line: 5,
        pointers: { left, right, mid },
        arrayState: [...nums],
        highlights: [mid],
        explanation: `Target found! nums[mid] (${nums[mid]}) matches target element ${target}. Returning index position ${mid}.`
      });
      return { steps, code: javaCode };
    }

    if (nums[mid] < target) {
      left = mid + 1;
      steps.push({
        line: 6,
        pointers: { left, right, mid },
        arrayState: [...nums],
        highlights: [mid],
        explanation: `nums[mid] (${nums[mid]}) is less than target ${target}. Dropping left window boundaries. Shifting left variable to mid + 1 (${left}).`
      });
    } else {
      right = mid - 1;
      steps.push({
        line: 7,
        pointers: { left, right, mid },
        arrayState: [...nums],
        highlights: [mid],
        explanation: `nums[mid] (${nums[mid]}) is greater than target ${target}. Dropping right window boundaries. Shifting right variable to mid - 1 (${right}).`
      });
    }
  }

  return { steps, code: javaCode };
}

// 3. JAVA BEST TIME TO BUY/SELL STOCK SIMULATOR
function runJavaBestTimeToBuySellStock(prices: number[]): SimulationResult {
  const steps: VisualStep[] = [];
  let minPrice = Infinity;
  let maxProfit = 0;

  const javaCode = `public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int maxProfit = 0;
    for (int i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }
    return maxProfit;
}`;

  // Initializing state variables frame output step
  steps.push({
    line: 2,
    pointers: {},
    arrayState: [...prices],
    highlights: [],
    explanation: "Java Virtual Machine: Instantiating minPrice variable registry slot to Integer.MAX_VALUE and base maxProfit tracker index to $0."
  });

  for (let i = 0; i < prices.length; i++) {
    const currentPrice = prices[i];

    // Line 5: Conditional comparison check
    steps.push({
      line: 5,
      pointers: { i },
      arrayState: [...prices],
      highlights: [i],
      explanation: `Day [${i}]: Evaluating current asset price $${currentPrice}. Checking if it drops below historic minimum threshold ($${minPrice === Infinity ? 'MAX_VALUE' : '$' + minPrice}).`
    });

    if (currentPrice < minPrice) {
      minPrice = currentPrice;

      // Line 6: Updating minPrice value anchor
      steps.push({
        line: 6,
        pointers: { i },
        arrayState: [...prices],
        highlights: [i],
        explanation: `Price drop confirmed! Updating baseline minPrice tracking register to point to today's low of $${minPrice}.`
      });
    } else {
      const currentProfit = currentPrice - minPrice;

      // Line 7: Evaluating maxProfit yield margins
      steps.push({
        line: 7,
        pointers: { i },
        arrayState: [...prices],
        highlights: [i],
        explanation: `Today's price ($${currentPrice}) is higher than minPrice ($${minPrice}). Calculating hypothetical transaction return: $${currentPrice} - $${minPrice} = $${currentProfit}. Testing against current maximum profit record ($${maxProfit}).`
      });

      if (currentProfit > maxProfit) {
        maxProfit = currentProfit;

        // Line 8: Recording the new profit margin limit step
        steps.push({
          line: 8,
          pointers: { i },
          arrayState: [...prices],
          highlights: [i],
          explanation: `Higher yield achieved! Updating state tracker maxProfit ledger block directly to $${maxProfit}.`
        });
      }
    }
  }

  // Line 11: Final sequence completion array evaluation loop breakout
  steps.push({
    line: 11,
    pointers: {},
    arrayState: [...prices],
    highlights: [],
    explanation: `Array analysis loops fully executed. Session closed. Returning absolute optimized return margin yield: $${maxProfit}.`
  });

  return { steps, code: javaCode };
}

// CENTRAL ROUTER REGISTRY ENGINE
export function engineRouter(id: string, nums: number[], target: number): SimulationResult | null {
  switch (id) {
    case 'two-sum':
      return runJavaTwoSum(nums, target);
    case 'binary-search':
      return runJavaBinarySearch(nums, target);
    case 'sliding-window':
      // The target value is omitted for Best Time to Buy/Sell stock computations
      return runJavaBestTimeToBuySellStock(nums);
    default:
      return null;
  }
}
