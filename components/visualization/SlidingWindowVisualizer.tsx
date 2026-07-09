// components/visualization/SlidingWindowVisualizer.tsx
import React, { useMemo } from 'react';

interface SlidingWindowVisualizerProps {
  data: any[];
  windowLeft: number;
  windowRight: number;
  highlightIndices?: number[];
  pointerIndices?: number[];
  className?: string;
  showWindowLabel?: boolean;
  renderNode?: (value: any, index: number, isInWindow: boolean) => React.ReactNode;
}

export const SlidingWindowVisualizer: React.FC<SlidingWindowVisualizerProps> = ({
  data,
  windowLeft,
  windowRight,
  highlightIndices = [],
  pointerIndices = [],
  className = '',
  showWindowLabel = true,
  renderNode,
}) => {
  const highlightSet = useMemo(() => new Set(highlightIndices), [highlightIndices]);
  const pointerSet = useMemo(() => new Set(pointerIndices), [pointerIndices]);

  const defaultRenderNode = (value: any, index: number, isInWindow: boolean) => (
    <div className="flex flex-col items-center justify-center h-full">
      <span className={`text-base font-extrabold ${isInWindow ? 'text-white' : 'text-slate-700 dark:text-white'}`}>
        {value}
      </span>
    </div>
  );

  const getNodeStyle = (index: number, isInWindow: boolean) => {
    const isHighlighted = highlightSet.has(index);
    const isPointed = pointerSet.has(index);

    const styles: React.CSSProperties = {
      borderColor: isHighlighted ? '#22c55e' : isPointed ? '#f59e0b' : isInWindow ? '#0ea5e9' : '#e2e8f0',
      backgroundColor: isHighlighted ? 'rgba(34, 197, 94, 0.2)' : isPointed ? 'rgba(245, 158, 11, 0.2)' : isInWindow ? '#0ea5e9' : '#f8fafc',
    };

    if (isHighlighted) {
      styles.boxShadow = '0 0 0 4px rgba(34, 197, 94, 0.3)';
    }
    if (isPointed) {
      styles.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.3)';
    }
    if (isInWindow && !isHighlighted && !isPointed) {
      styles.color = 'white';
    }

    return styles;
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-wrap gap-3 items-center justify-start min-h-[70px]">
        {data.map((value, index) => {
          const isInWindow = index >= windowLeft && index <= windowRight;
          const isHighlighted = highlightSet.has(index);
          const isPointed = pointerSet.has(index);

          return (
            <div key={index} className="relative">
              <div
                className={`
                  w-14 h-14 rounded-xl flex flex-col items-center justify-center
                  border-2 transition-all duration-300 relative
                  ${isInWindow && !isHighlighted && !isPointed ? 'text-white' : ''}
                  ${isHighlighted ? 'pulse-success' : ''}
                  ${isPointed ? 'pulse-active' : ''}
                `}
                style={getNodeStyle(index, isInWindow)}
              >
                {renderNode
                  ? renderNode(value, index, isInWindow)
                  : defaultRenderNode(value, index, isInWindow)}
                <span className="text-[10px] text-slate-400 dark:text-slate-500 absolute top-1 font-mono">
                  {index}
                </span>
              </div>
              {isPointed && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-amber-500 font-bold text-xs">
                  ↑
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Window bracket indicator */}
      {showWindowLabel && windowLeft >= 0 && windowRight >= 0 && windowLeft <= windowRight && (
        <div className="mt-6 flex justify-center">
          <div className="text-xs font-bold text-sky-500 dark:text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Window: [{windowLeft} ... {windowRight}]
          </div>
        </div>
      )}
    </div>
  );
};
