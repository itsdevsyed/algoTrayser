// @/data/problems.ts

export interface CodeFrame {
    line: number;
    pointers: Record<string, number>;
    highlights: number[];
    hashmap?: Record<string, number | string>;
    explanation: string;
  }

  export interface GenericProblemBlueprint {
    id: string;
    title: string;
    difficulty: string;
    code: string;
    generateSteps: (nums: number[], target: number) => CodeFrame[];
  }

  export const MasterProblemRegistry: Record<string, GenericProblemBlueprint> = {

    // 1. TWO SUM CONFIGURATION
    'two-sum': {
      id: 'two-sum',
      title: 'Two Sum',
      difficulty: 'Easy',
      code: `public int[] twoSum(int[] nums, int target) {
      Map<Integer, Integer> map = new HashMap<>();
      for (int i = 0; i < nums.length; i++) {
          int complement = target - nums[i];
          if (map.containsKey(complement)) {
              return new int[] { map.get(complement), i };
          }
          map.put(nums[i], i);
      }
      return new int[] {};
  }`,
      generateSteps: (nums, target) => {
        const frames: CodeFrame[] = [];
        const map: Record<string, number> = {};

        for (let i = 0; i < nums.length; i++) {
          const val = nums[i];
          const complement = target - val;

          frames.push({
            line: 4,
            pointers: { i },
            highlights: [i],
            hashmap: { ...map },
            explanation: `Evaluating index i = ${i} (value: ${val}). Complement: ${target} - ${val} = ${complement}.`
          });

          if (complement in map) {
            frames.push({
              line: 6,
              pointers: { i },
              highlights: [map[complement], i],
              hashmap: { ...map },
              explanation: `Found complement ${complement} at index ${map[complement]}! Match confirmed.`
            });
            return frames;
          }

          map[val.toString()] = i;
          frames.push({
            line: 8,
            pointers: { i },
            highlights: [i],
            hashmap: { ...map },
            explanation: `Stored value ${val} at map index ${i}. Moving forward.`
          });
        }
        return frames;
      }
    },

    // 2. BINARY SEARCH CONFIGURATION
    'binary-search': {
      id: 'binary-search',
      title: 'Binary Search',
      difficulty: 'Easy',
      code: `public int binarySearch(int[] nums, int target) {
      int left = 0, right = nums.length - 1;
      while (left <= right) {
          int mid = left + (right - left) / 2;
          if (nums[mid] == target) return mid;
          if (nums[mid] < target) left = mid + 1;
          else right = mid - 1;
      }
      return -1;
  }`,
      generateSteps: (nums, target) => {
        const frames: CodeFrame[] = [];
        let left = 0;
        let right = nums.length - 1;

        while (left <= right) {
          const mid = Math.floor(left + (right - left) / 2);

          frames.push({
            line: 4,
            pointers: { left, right, mid },
            highlights: [mid],
            explanation: `Calculated middle splitting index split boundary: mid = ${mid} (Value: ${nums[mid]}).`
          });

          if (nums[mid] === target) {
            frames.push({
              line: 5,
              pointers: { left, right, mid },
              highlights: [mid],
              explanation: `Element matched target value ${target} at index ${mid}!`
            });
            return frames;
          }

          if (nums[mid] < target) {
            left = mid + 1;
            frames.push({
              line: 6,
              pointers: { left, right },
              highlights: [],
              explanation: `${nums[mid]} is less than target. Dropping left half window. Shifting left to ${left}.`
            });
          } else {
            right = mid - 1;
            frames.push({
              line: 7,
              pointers: { left, right },
              highlights: [],
              explanation: `${nums[mid]} is greater than target. Dropping right half window. Shifting right to ${right}.`
            });
          }
        }
        return frames;
      }
    },

    // 3. BEST TIME TO BUY/SELL STOCK CONFIGURATION (Fixed Step Synchronization)
    'sliding-window': {
      id: 'sliding-window',
      title: '121. Best Time to Buy/Sell Stock',
      difficulty: 'Easy',
      code: `public int maxProfit(int[] prices) {
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
  }`,
      generateSteps: (nums, target) => {
        const frames: CodeFrame[] = [];
        let minPrice = Infinity;
        let maxProfit = 0;

        // Initial frame layout state configuration
        frames.push({
          line: 2,
          pointers: {},
          highlights: [],
          explanation: "Initializing minPrice tracking memory to Integer.MAX_VALUE and base maxProfit pointer state to $0."
        });

        for (let i = 0; i < nums.length; i++) {
          const currentPrice = nums[i];

          // Step A: Hit line 5 to compare current element value against historic minimum buy price anchor
          frames.push({
            line: 5,
            pointers: { i },
            highlights: [i],
            explanation: `Day [${i}]: Current price asset value is $${currentPrice}. Comparing with existing minPrice ($${minPrice === Infinity ? 'MAX' : minPrice}).`
          });

          if (currentPrice < minPrice) {
            minPrice = currentPrice;

            // Step B: Record the drop transition update mapping configuration trace framework
            frames.push({
              line: 6,
              pointers: { i },
              highlights: [i],
              explanation: `New lowest asset buying floor discovered! Updating internal minPrice track index value allocation to $${minPrice}.`
            });
          } else {
            const profit = currentPrice - minPrice;

            // Step C: Hit line 7 else-if evaluation bracket trace
            frames.push({
              line: 7,
              pointers: { i },
              highlights: [i],
              explanation: `$${currentPrice} is higher than minPrice $${minPrice}. Evaluating transaction profit layout yields: $${currentPrice} - $${minPrice} = $${profit}. Comparing with top maxProfit ($${maxProfit}).`
            });

            if (profit > maxProfit) {
              maxProfit = profit;

              // Step D: Record the new maximum peak execution value sequence frame
              frames.push({
                line: 8,
                pointers: { i },
                highlights: [i],
                explanation: `Higher yield margin checked! Updating baseline system maxProfit ledger value state to $${maxProfit}.`
              });
            }
          }
        }

        // Final closure execution block context return sequence state
        frames.push({
          line: 11,
          pointers: {},
          highlights: [],
          explanation: `Array memory pipeline sequence loop run finished. Returning absolute optimal calculated execution returns: $${maxProfit}.`
        });

        return frames;
      }
    }
  };
