// utils/tracerGenerators/twoSumTracer.ts
import { Step } from '../../types';

export const generateTwoSumTracer = (nums: number[], target: number): Step[] => {
  const steps: Step[] = [];

  steps.push({
    type: 'init',
    i: -1,
    mapState: {},
    highlightLines: { js: 3, py: 3, java: 3 },
    title: 'Initialize Hash Map',
    desc: 'An empty HashMap is created to register numbers and their indices as we encounter them.'
  });

  const seen: Record<number, number> = {};

  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    const complement = target - x;

    steps.push({
      type: 'read',
      i,
      value: x,
      complement: null,
      mapState: { ...seen },
      highlightLines: { js: 5, py: 4, java: 5 },
      title: `Check index ${i}`,
      desc: `We inspect index <strong>${i}</strong>. Current value <code class="font-mono text-amber-500">${x}</code>.`
    });

    steps.push({
      type: 'compute',
      i,
      value: x,
      complement,
      mapState: { ...seen },
      highlightLines: { js: 6, py: 5, java: 6 },
      title: 'Calculate complement',
      desc: `Subtract current value from target: <code class="font-mono text-indigo-500">${target} - ${x} = ${complement}</code>.`
    });

    const exists = complement in seen;

    steps.push({
      type: 'check',
      i,
      value: x,
      complement,
      mapState: { ...seen },
      highlightLines: { js: 7, py: 6, java: 7 },
      title: `Lookup map for ${complement}`,
      desc: exists
        ? `Complement <code class="font-mono text-violet-500">${complement}</code> is already in our map! It resides at index <strong>${seen[complement]}</strong>.`
        : `Complement <code class="font-mono text-violet-400">${complement}</code> is not in our map.`,
      variables: { exists: exists ? 'Yes' : 'No' }
    });

    if (exists) {
      steps.push({
        type: 'match',
        i,
        j: seen[complement],
        value: x,
        complement,
        mapState: { ...seen },
        highlightLines: { js: 8, py: 7, java: 8 },
        title: '🎉 Match found!',
        desc: `Solution found! Return indices [<strong>${seen[complement]}</strong>, <strong>${i}</strong>].`,
        variables: { result: `[${seen[complement]}, ${i}]` }
      });
      return steps;
    }

    seen[x] = i;

    steps.push({
      type: 'insert',
      i,
      value: x,
      complement,
      mapState: { ...seen },
      highlightLines: { js: 10, py: 8, java: 10 },
      title: `Store ${x} in Map`,
      desc: `No match found. Register <code class="font-mono text-amber-400">${x}</code> → index <code class="font-mono text-sky-400">${i}</code>.`
    });
  }

  steps.push({
    type: 'no-solution',
    i: nums.length,
    mapState: seen,
    highlightLines: { js: 12, py: 9, java: 12 },
    title: 'No solution found',
    desc: 'Exhausted array without finding any matching pairs.'
  });

  return steps;
};
