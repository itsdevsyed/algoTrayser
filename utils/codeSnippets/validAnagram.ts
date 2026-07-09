// utils/codeSnippets/validAnagram.ts
import { CodeSnippet } from '@/types';

export const validAnagramCodeSnippets: CodeSnippet = {
  js: [
    '<span class="text-pink-600 dark:text-pink-400">function</span> <span class="text-yellow-400 dark:text-yellow-300 font-semibold">isAnagram</span>(<span class="text-blue-400">s</span>, <span class="text-blue-400">t</span>) <span class="text-pink-600 dark:text-pink-400">{</span>',
    '  <span class="text-green-500 dark:text-green-400">// Create character count map</span>',
    '  <span class="text-pink-600 dark:text-pink-400">const</span> <span class="text-yellow-400">charCount</span> <span class="text-pink-600 dark:text-pink-400">=</span> <span class="text-pink-600 dark:text-pink-400">{}</span>;',
    '  <span class="text-pink-600 dark:text-pink-400">for</span> (<span class="text-pink-600 dark:text-pink-400">const</span> <span class="text-yellow-400">char</span> <span class="text-pink-600 dark:text-pink-400">of</span> s) <span class="text-pink-600 dark:text-pink-400">{</span>',
    '    charCount[char] <span class="text-pink-600 dark:text-pink-400">=</span> (charCount[char] <span class="text-pink-600 dark:text-pink-400">||</span> <span class="text-orange-400">0</span>) <span class="text-pink-600 dark:text-pink-400">+</span> <span class="text-orange-400">1</span>;',
    '  <span class="text-pink-600 dark:text-pink-400">}</span>',
    '  <span class="text-pink-600 dark:text-pink-400">for</span> (<span class="text-pink-600 dark:text-pink-400">const</span> <span class="text-yellow-400">char</span> <span class="text-pink-600 dark:text-pink-400">of</span> t) <span class="text-pink-600 dark:text-pink-400">{</span>',
    '    <span class="text-pink-600 dark:text-pink-400">if</span> (<span class="text-pink-600 dark:text-pink-400">!</span>charCount[char]) <span class="text-pink-600 dark:text-pink-400">return</span> <span class="text-pink-600 dark:text-pink-400">false</span>;',
    '    charCount[char]<span class="text-pink-600 dark:text-pink-400">--</span>;',
    '  <span class="text-pink-600 dark:text-pink-400">}</span>',
    '  <span class="text-pink-600 dark:text-pink-400">return</span> <span class="text-pink-600 dark:text-pink-400">true</span>;',
    '<span class="text-pink-600 dark:text-pink-400">}</span>'
  ],
  py: [
    '<span class="text-pink-600 dark:text-pink-400">def</span> <span class="text-yellow-400 dark:text-yellow-300 font-semibold">isAnagram</span>(<span class="text-blue-400">s</span>, <span class="text-blue-400">t</span>)<span class="text-pink-600 dark:text-pink-400">:</span>',
    '    <span class="text-green-500 dark:text-green-400"># Create character count map</span>',
    '    <span class="text-yellow-400">charCount</span> <span class="text-pink-600 dark:text-pink-400">=</span> <span class="text-pink-600 dark:text-pink-400">{}</span>',
    '    <span class="text-pink-600 dark:text-pink-400">for</span> char <span class="text-pink-600 dark:text-pink-400">in</span> s<span class="text-pink-600 dark:text-pink-400">:</span>',
    '        charCount[char] <span class="text-pink-600 dark:text-pink-400">=</span> charCount.get(char, <span class="text-orange-400">0</span>) <span class="text-pink-600 dark:text-pink-400">+</span> <span class="text-orange-400">1</span>',
    '    <span class="text-pink-600 dark:text-pink-400">for</span> char <span class="text-pink-600 dark:text-pink-400">in</span> t<span class="text-pink-600 dark:text-pink-400">:</span>',
    '        <span class="text-pink-600 dark:text-pink-400">if</span> char <span class="text-pink-600 dark:text-pink-400">not</span> <span class="text-pink-600 dark:text-pink-400">in</span> charCount <span class="text-pink-600 dark:text-pink-400">or</span> charCount[char] <span class="text-pink-600 dark:text-pink-400">==</span> <span class="text-orange-400">0</span><span class="text-pink-600 dark:text-pink-400">:</span>',
    '            <span class="text-pink-600 dark:text-pink-400">return</span> <span class="text-pink-600 dark:text-pink-400">False</span>',
    '        charCount[char] <span class="text-pink-600 dark:text-pink-400">-</span><span class="text-pink-600 dark:text-pink-400">=</span> <span class="text-orange-400">1</span>',
    '    <span class="text-pink-600 dark:text-pink-400">return</span> <span class="text-pink-600 dark:text-pink-400">True</span>'
  ],
  java: [
    '<span class="text-pink-600 dark:text-pink-400">public boolean</span> <span class="text-yellow-400 dark:text-yellow-300 font-semibold">isAnagram</span>(<span class="text-pink-600 dark:text-pink-400">String</span> <span class="text-blue-400">s</span>, <span class="text-pink-600 dark:text-pink-400">String</span> <span class="text-blue-400">t</span>) <span class="text-pink-600 dark:text-pink-400">{</span>',
    '    <span class="text-green-500 dark:text-green-400">// Create character count map</span>',
    '    <span class="text-blue-400">Map</span>&lt;<span class="text-blue-400">Character</span>, <span class="text-blue-400">Integer</span>&gt; <span class="text-yellow-400">charCount</span> <span class="text-pink-600 dark:text-pink-400">=</span> <span class="text-pink-600 dark:text-pink-400">new</span> <span class="text-blue-400">HashMap</span>&lt;&gt;();',
    '    <span class="text-pink-600 dark:text-pink-400">for</span> (<span class="text-pink-600 dark:text-pink-400">char</span> <span class="text-yellow-400">c</span> <span class="text-pink-600 dark:text-pink-400">:</span> s.toCharArray()) <span class="text-pink-600 dark:text-pink-400">{</span>',
    '        charCount.put(c, charCount.getOrDefault(c, <span class="text-orange-400">0</span>) <span class="text-pink-600 dark:text-pink-400">+</span> <span class="text-orange-400">1</span>);',
    '    <span class="text-pink-600 dark:text-pink-400">}</span>',
    '    <span class="text-pink-600 dark:text-pink-400">for</span> (<span class="text-pink-600 dark:text-pink-400">char</span> <span class="text-yellow-400">c</span> <span class="text-pink-600 dark:text-pink-400">:</span> t.toCharArray()) <span class="text-pink-600 dark:text-pink-400">{</span>',
    '        <span class="text-pink-600 dark:text-pink-400">if</span> (<span class="text-pink-600 dark:text-pink-400">!</span>charCount.containsKey(c) <span class="text-pink-600 dark:text-pink-400">||</span> charCount.get(c) <span class="text-pink-600 dark:text-pink-400">==</span> <span class="text-orange-400">0</span>) <span class="text-pink-600 dark:text-pink-400">return</span> <span class="text-pink-600 dark:text-pink-400">false</span>;',
    '        charCount.put(c, charCount.get(c) <span class="text-pink-600 dark:text-pink-400">-</span> <span class="text-orange-400">1</span>);',
    '    <span class="text-pink-600 dark:text-pink-400">}</span>',
    '    <span class="text-pink-600 dark:text-pink-400">return</span> <span class="text-pink-600 dark:text-pink-400">true</span>;',
    '<span class="text-pink-600 dark:text-pink-400">}</span>'
  ]
};
