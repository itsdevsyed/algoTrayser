// utils/tracers/validAnagramTracer.ts
import { Step } from '@/types';

export const generateValidAnagramTracer = (input: any, target?: any): Step[] => {
  const steps: Step[] = [];

  // Handle both cases: array of two strings OR a single string
  let s: string = '';
  let t: string = '';

  if (Array.isArray(input) && input.length === 2) {
    s = String(input[0] || '');
    t = String(input[1] || '');
  } else if (typeof input === 'string') {
    const parts = input.split(',').map(str => str.trim());
    if (parts.length === 2) {
      s = parts[0];
      t = parts[1];
    } else {
      s = input;
      t = '';
    }
  } else {
    s = String(input || '');
    t = '';
  }

  // If no second string, return early
  if (!s || !t) {
    steps.push({
      type: 'init',
      i: -1,
      mapState: {},
      highlightLines: { js: 3, py: 3, java: 3 },
      title: 'Error: Invalid Input',
      desc: 'Please provide two strings separated by comma (e.g., "anagram, nagaram")'
    });
    return steps;
  }

  // Step 1: Initialize
  steps.push({
    type: 'init',
    i: -1,
    mapState: {},
    highlightLines: { js: 3, py: 3, java: 3 },
    title: 'Initialize Character Map',
    desc: `We'll count characters in first string "${s}" and compare with "${t}".`
  });

  const charCount: Record<string, number> = {};

  // Step 2: Count characters in first string
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    charCount[char] = (charCount[char] || 0) + 1;

    steps.push({
      type: 'insert',
      i: i,
      value: char,
      mapState: { ...charCount },
      highlightLines: { js: 5, py: 4, java: 5 },
      title: `Count character "${char}"`,
      desc: `Added "${char}" to character map. Count: ${charCount[char]}`,
      variables: { 'Current Char': char, 'Count': charCount[char] }
    });
  }

  // Step 3: Verify with second string
  let foundMismatch = false;

  for (let i = 0; i < t.length; i++) {
    const char = t[i];

    if (!charCount[char] || charCount[char] === 0) {
      // ✅ Add the mismatch step
      steps.push({
        type: 'no-solution',  // Use no-solution type
        i: i,
        value: char,
        mapState: { ...charCount },
        highlightLines: { js: 8, py: 7, java: 8 },
        title: `❌ Character "${char}" not found!`,
        desc: `Character "${char}" appears in second string but not in first. NOT an anagram!`,
        variables: { 'Char': char, 'Status': 'Not anagram ❌', 'Result': 'false ❌' }
      });
      foundMismatch = true;
      break;
    }

    charCount[char]--;

    steps.push({
      type: 'check',
      i: i,
      value: char,
      mapState: { ...charCount },
      highlightLines: { js: 8, py: 7, java: 8 },
      title: `✓ Character "${char}" found`,
      desc: `Character "${char}" matches. Remaining count: ${charCount[char]}`,
      variables: { 'Char': char, 'Remaining': charCount[char] }
    });
  }

  // ✅ If we already found a mismatch, return steps with the error
  if (foundMismatch) {
    return steps;
  }

  // Step 4: Check if all counts are zero
  const allZero = Object.values(charCount).every(count => count === 0);

  if (allZero) {
    steps.push({
      type: 'match',
      i: -1,
      mapState: { ...charCount },
      highlightLines: { js: 12, py: 9, java: 12 },
      title: '🎉 Valid Anagram!',
      desc: `"${s}" and "${t}" are anagrams! Both strings have the same character counts.`,
      variables: { 'Result': 'true ✅' }
    });
  } else {
    // ✅ If not all zero, add no-solution
    steps.push({
      type: 'no-solution',
      i: -1,
      mapState: { ...charCount },
      highlightLines: { js: 14, py: 10, java: 14 },
      title: '❌ Not an Anagram',
      desc: `"${s}" and "${t}" are NOT anagrams. Character counts don't match.`,
      variables: { 'Result': 'false ❌' }
    });
  }

  return steps;
};
