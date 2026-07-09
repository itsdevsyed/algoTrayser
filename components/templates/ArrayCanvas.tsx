'use client';
import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';

export default function ArrayCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { steps, currentStep } = usePlayerStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || steps.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get current frame data
    const currentData = steps[currentStep];
    const { arrayState, pointers, highlights } = currentData;

    // Fallback if hashmap doesn't exist yet on older steps
    const hashmapData = (currentData as any).hashmap || {};

    // Base Configuration matching the dark Nordic theme
    const colors = {
      bg: '#0d0f17',
      boxBg: '#11131c',
      boxStroke: '#1e293b',
      activeBg: 'rgba(99, 102, 241, 0.08)',
      activeStroke: '#6366f1',
      textMain: '#f3f4f6',
      textMuted: '#475569',
      textAccent: '#818cf8',
      keyColor: '#38bdf8', // Modern Sky Blue for Hash Keys
      valColor: '#34d399', // Mint Green for Hash Values
    };

    // Clear frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- SECTION 1: DRAW ARRAY BLOCKS ---
    const boxSize = 52;
    const gap = 12;
    const totalArrayWidth = arrayState.length * (boxSize + gap) - gap;
    const arrayX = (canvas.width - totalArrayWidth) / 2;
    const arrayY = 50;

    arrayState.forEach((val, i) => {
      const x = arrayX + i * (boxSize + gap);
      const isHighlighted = highlights.includes(i);

      ctx.fillStyle = isHighlighted ? colors.activeBg : colors.boxBg;
      ctx.strokeStyle = isHighlighted ? colors.activeStroke : colors.boxStroke;
      ctx.lineWidth = isHighlighted ? 2 : 1;

      ctx.beginPath();
      ctx.roundRect(x, arrayY, boxSize, boxSize, 6);
      ctx.fill();
      ctx.stroke();

      // Number value
      ctx.fillStyle = isHighlighted ? '#ffffff' : colors.textMain;
      ctx.font = isHighlighted ? '600 15px ui-monospace' : '500 15px ui-monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(val.toString(), x + boxSize / 2, arrayY + boxSize / 2);

      // Index label
      ctx.fillStyle = colors.textMuted;
      ctx.font = '10px ui-monospace';
      ctx.fillText(`[${i}]`, x + boxSize / 2, arrayY - 14);

      // Pointers layout (i, left, right)
      Object.entries(pointers).forEach(([pointerName, targetIndex]) => {
        if (targetIndex === i) {
          ctx.fillStyle = colors.textAccent;
          ctx.font = '500 11px ui-monospace';
          ctx.fillText(`↑ ${pointerName}`, x + boxSize / 2, arrayY + boxSize + 18);
        }
      });
    });

    // --- SECTION 2: DRAW DYNAMIC HASHMAP STORE ---
    const hashmapY = 160;
    const keys = Object.keys(hashmapData);

    // Header label for the map
    ctx.fillStyle = colors.textMuted;
    ctx.font = '500 10px ui-monospace';
    ctx.textAlign = 'left';
    ctx.fillText("HASHMAP STATE", 32, hashmapY - 14);

    if (keys.length === 0) {
      ctx.fillStyle = '#334155';
      ctx.font = 'italic 12px ui-monospace';
      ctx.fillText("Ø empty mapping", 32, hashmapY + 12);
    } else {
      // Draw Hashmap data entries as sequential structural boxes
      keys.forEach((key, idx) => {
        const itemX = 32 + (idx * 105);
        const itemW = 92;
        const itemH = 38;

        // Container Box
        ctx.fillStyle = colors.boxBg;
        ctx.strokeStyle = colors.boxStroke;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(itemX, hashmapY, itemW, itemH, 4);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '11px ui-monospace';

        // Key String
        ctx.fillStyle = colors.keyColor;
        ctx.fillText(`k: ${key}`, itemX + itemW / 2, hashmapY + 11);

        // Value String
        ctx.fillStyle = colors.valColor;
        ctx.fillText(`v → ${hashmapData[key]}`, itemX + itemW / 2, hashmapY + 26);
      });
    }

  }, [steps, currentStep]);

  return (
    <div className="w-full overflow-x-auto flex justify-center bg-[#0d0f17] rounded-xl border border-gray-800/60 p-2">
      <canvas
        ref={canvasRef}
        width={650}
        height={220}
        className="max-w-full"
      />
    </div>
  );
}
