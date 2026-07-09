// components/visualization/ArrayVisualizer.tsx
import React, { useMemo } from 'react';

interface ArrayVisualizerProps {
  data: any[];
  highlightIndices?: number[];
  pointerIndices?: number[];
  pointerLabels?: string[];
  className?: string;
  showIndices?: boolean;
  getNodeStyle?: (value: any, index: number) => React.CSSProperties;
  renderNode?: (value: any, index: number) => React.ReactNode;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  data,
  highlightIndices = [],
  pointerIndices = [],
  pointerLabels = [],
  className = '',
  showIndices = true,
  getNodeStyle,
  renderNode,
}) => {
  const highlightSet = useMemo(() => new Set(highlightIndices), [highlightIndices]);
  const pointerSet = useMemo(() => new Map(
    pointerIndices.map((idx, i) => [idx, pointerLabels[i] || `p${i}`])
  ), [pointerIndices, pointerLabels]);

  const defaultGetNodeStyle = (value: any, index: number): React.CSSProperties => {
    const isHighlighted = highlightSet.has(index);
    const isPointed = pointerSet.has(index);

    const styles: React.CSSProperties = {
      borderColor: isHighlighted ? '#22c55e' : isPointed ? '#f59e0b' : '#e2e8f0',
      backgroundColor: isHighlighted ? 'rgba(34, 197, 94, 0.1)' : isPointed ? 'rgba(245, 158, 11, 0.1)' : '#f8fafc',
    };

    if (isHighlighted) {
      styles.boxShadow = '0 0 0 4px rgba(34, 197, 94, 0.3)';
    }

    return styles;
  };

  const defaultRenderNode = (value: any, index: number) => (
    <div className="flex flex-col items-center justify-center h-full">
      <span className="text-base font-extrabold text-slate-700 dark:text-white">
        {value}
      </span>
    </div>
  );

  return (
    <div className={`flex flex-wrap gap-3 items-center justify-start min-h-[70px] ${className}`}>
      {data.map((value, index) => (
        <div key={index} className="relative">
          <div
            className={`
              w-14 h-14 rounded-xl flex flex-col items-center justify-center
              border-2 transition-all duration-300 relative
              ${highlightSet.has(index) ? 'pulse-success' : ''}
              ${pointerSet.has(index) ? 'pulse-active' : ''}
            `}
            style={getNodeStyle ? getNodeStyle(value, index) : defaultGetNodeStyle(value, index)}
          >
            {renderNode ? renderNode(value, index) : defaultRenderNode(value, index)}
            {showIndices && (
              <span className="text-xs text-slate-400 dark:text-slate-500 absolute top-1 font-mono">
                {index}
              </span>
            )}
          </div>
          {pointerSet.has(index) && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-amber-500 font-bold text-xs whitespace-nowrap">
              {pointerSet.get(index)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
