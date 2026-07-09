'use client';
import { useEffect, use, useState } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';
import { engineRouter } from '@/utils/algorithmEngine';
import ArrayCanvas from '@/components/templates/ArrayCanvas';
import PlayerControls from '@/components/PlayerControls';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WatchPage({ params }: PageProps) {
  const { id } = use(params);
  const { steps, currentStep, setProblemData } = usePlayerStore();

  // Unified dynamic control state inputs
  const [arrayInput, setArrayInput] = useState("");
  const [targetInput, setTargetInput] = useState("");
  const [currentCode, setCurrentCode] = useState("");

  // Hook 1: Synchronize valid baseline data inputs depending on route parameter match
  useEffect(() => {
    if (id === 'binary-search') {
      setArrayInput("2, 5, 8, 12, 16, 23, 38, 56");
      setTargetInput("23");
    } else if (id === 'sliding-window') {
      // Stock market prices array data baseline setup (Target value is not used, so set to 0)
      setArrayInput("7, 1, 5, 3, 6, 4");
      setTargetInput("0");
    } else {
      setArrayInput("3, 5, 8, 11, 7, 14");
      setTargetInput("21");
    }
  }, [id]);

  // Hook 2: Dynamic compiler simulation engine controller loop
  const handleCompileSimulation = () => {
    try {
      if (!arrayInput) return;

      const parsedArray = arrayInput
        .split(',')
        .map(item => parseInt(item.trim(), 10))
        .filter(num => !isNaN(num));

      // Stock algorithms don't require a valid target value lookup, default to safe 0
      const parsedTarget = id === 'sliding-window' ? 0 : parseInt(targetInput.trim(), 10);

      if (parsedArray.length === 0 || isNaN(parsedTarget)) return;

      // Pass runtime states back into the dynamic utility engine router module
      const result = engineRouter(id, parsedArray, parsedTarget);

      if (result) {
        setCurrentCode(result.code);

        // Standardize steps format for ArrayCanvas tracking contexts
        const structuredSteps = result.steps.map(step => ({
          ...step,
          arrayState: parsedArray
        }));

        setProblemData(structuredSteps, result.code);
        usePlayerStore.setState({ currentStep: 0, isPlaying: false });
      }
    } catch (e) {
      console.error("Simulation compilation tracking failure", e);
    }
  };

  useEffect(() => {
    if (arrayInput && targetInput !== "") {
      handleCompileSimulation();
    }
  }, [id, arrayInput, targetInput]);

  const currentStepData = steps[currentStep];

  // Loading asset safe check container wrapper boundary guard rule
  if (steps.length === 0) {
    return (
      <div className="min-h-screen bg-[#090b11] text-gray-400 flex items-center justify-center font-mono text-xs">
        Initializing Engine Modules...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#090b11] text-[#f3f4f6] antialiased p-6 flex flex-col gap-4">
      <header className="border-b border-gray-800/60 bg-[#0c0e17]/80 backdrop-blur-md px-6 py-3.5 max-w-5xl w-full mx-auto rounded-xl">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-sm font-semibold tracking-tight text-white capitalize">
            Java Tracer Engine: <span className="text-indigo-400 font-mono">{id.replace('-', ' ')}</span>
          </h1>
          <a href="/" className="text-[11px] font-mono text-gray-500 hover:text-white transition-colors">Exit Session ✕</a>
        </div>
      </header>

      <div className="max-w-5xl w-full mx-auto flex flex-col gap-4">

        {/* RUNTIME SIMULATOR CONFIGURATION CARD */}
        <section className="bg-[#11131c] border border-gray-800/80 rounded-xl p-4 shadow-xl flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-1 flex flex-col gap-1.5 w-full">
            <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Input Memory Tokens (int[])</label>
            <input
              type="text"
              value={arrayInput}
              onChange={(e) => setArrayInput(e.target.value)}
              className="bg-[#0d0f17] border border-gray-800 rounded-md px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-indigo-500/50 w-full"
            />
          </div>
          <div className="w-full sm:w-32 flex flex-col gap-1.5">
            <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Target Value</label>
            <input
              type="text"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              disabled={id === 'sliding-window'}
              className="bg-[#0d0f17] border border-gray-800 rounded-md px-3 py-1.5 text-xs font-mono text-white text-center focus:outline-none focus:border-indigo-500/50 w-full disabled:opacity-30"
            />
          </div>
        </section>

        {/* VISUAL MONITOR FOR CANVAS ACTIONS */}
        <section className="bg-[#11131c] border border-gray-800/80 rounded-xl overflow-hidden shadow-xl shadow-black/20">
          <div className="p-6 flex justify-center bg-[#0d0f17]/40 border-b border-gray-800/40 overflow-x-auto">
            <ArrayCanvas />
          </div>

          <div className="p-4 border-b border-gray-800/40 flex flex-col gap-1">
            <div className="text-[10px] font-mono tracking-wider text-gray-500 uppercase">Current Thread Instruction Trace</div>
            <p className="text-xs text-gray-300 font-sans leading-relaxed tracking-wide min-h-[32px]">
              {currentStepData?.explanation || "Awaiting execution thread state initialization..."}
            </p>
          </div>

          <div className="p-4 bg-[#131622]">
            <PlayerControls />
          </div>
        </section>

        {/* NATIVE JAVA CODE LOOKUP SCREEN */}
        <section className="flex flex-col bg-[#11131c] border border-gray-800/80 rounded-xl overflow-hidden shadow-xl min-h-[260px]">
          <div className="bg-[#151824] border-b border-gray-800/60 px-4 py-2.5">
            <span className="text-[10px] font-mono font-medium tracking-wider text-gray-400 uppercase">Compiled Object Class Reflection Source (Java)</span>
          </div>
          <div className="flex-1 overflow-auto p-4 bg-[#0d0f17]">
            <pre className="font-mono text-[13px] leading-6 select-text">
              {currentCode.split('\n').map((lineText, index) => {
                const lineNum = index + 1;
                const isCurrentLine = currentStepData?.line === lineNum;
                return (
                  <div
                    key={index}
                    className={`flex items-start transition-colors duration-150 py-0.5 ${
                      isCurrentLine
                        ? 'bg-indigo-500/10 text-white border-l-2 border-indigo-500 -ml-4 pl-[14px]'
                        : 'text-gray-400 hover:bg-gray-800/20'
                    }`}
                  >
                    <span className="w-9 text-right select-none pr-3 opacity-25 text-xs font-mono tabular-nums">{lineNum}</span>
                    <span className="whitespace-pre flex-1 tracking-wide">{lineText}</span>
                  </div>
                );
              })}
            </pre>
          </div>
        </section>

      </div>
    </main>
  );
}
