// components/visualization/TwoPointerVisualizer.tsx
import React, { useMemo } from 'react';

interface TwoPointerVisualizerProps {
  data: any[];
  leftPointer: number;
  rightPointer: number;
  highlightIndices?: number[];
  className?: string;
  leftLabel?: string;
  rightLabel?: string;
  renderNode?: (value: any, index: number) => React.ReactNode;
}

export const TwoPointerVisualizer: React.FC<TwoPointerVisualizerProps> = ({
  data,
  leftPointer,
  rightPointer,
  highlightIndices = [],
  className = '',
  leftLabel = 'L',
  rightLabel = 'R',
  renderNode,
}) => {
  const highlightSet = useMemo(() => new Set(highlightIndices), [highlightIndices]);

  const defaultRenderNode = (value: any, index: number) => (
    <div className="flex flex-col items-center justify-center h-full">
      <span className="text-base font-extrabold text-slate-700 dark:text-white">
        {value}
      </span>
    </div>
  );

  const getNodeStyle = (index: number) => {
    const isLeft = index === leftPointer;
    const isRight = index === rightPointer;
    const isHighlighted = highlightSet.has(index);

    let borderColor = '#e2e8f0';
    let bgColor = '#f8fafc';

    if (isLeft && isRight) {
      borderColor = '#8b5cf6';
      bgColor = 'rgba(139, 92, 246, 0.2)';
    } else if (isLeft) {
      borderColor = '#3b82f6';
      bgColor = 'rgba(59, 130, 246, 0.15)';
    } else if (isRight) {
      borderColor = '#ef4444';
      bgColor = 'rgba(239, 68, 68, 0.15)';
    } else if (isHighlighted) {
      borderColor = '#22c55e';
      bgColor = 'rgba(34, 197, 94, 0.1)';
    }

    const styles: React.CSSProperties = {
      borderColor,
      backgroundColor: bgColor,
    };

    if (isHighlighted) {
      styles.boxShadow = '0 0 0 4px rgba(34, 197, 94, 0.3)';
    }
    if (isLeft || isRight) {
      styles.boxShadow = `0 0 0 4px ${borderColor}40`;
    }

    return styles;
  };

  return (
    <div className={`flex flex-wrap gap-3 items-center justify-start min-h-[70px] ${className}`}>
      {data.map((value, index) => {
        const isLeft = index === leftPointer;
        const isRight = index === rightPointer;

        let pointerLabel = '';
        if (isLeft && isRight) pointerLabel = 'L,R';
        else if (isLeft) pointerLabel = leftLabel;
        else if (isRight) pointerLabel = rightLabel;

        return (
          <div key={index} className="relative">
            <div
              className={`
                w-14 h-14 rounded-xl flex flex-col items-center justify-center
                border-2 transition-all duration-300 relative
                ${isLeft || isRight ? 'scale-105' : ''}
                ${highlightSet ? 'pulse-success' : ''}
              `}
              style={getNodeStyle(index)}
            >
              {renderNode ? renderNode(value, index) : defaultRenderNode(value, index)}
              <span className="text-[10px] text-slate-400 dark:text-slate-500 absolute top-1 font-mono">
                {index}
              </span>
            </div>
            {pointerLabel && (
              <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 font-bold text-xs whitespace-nowrap ${
                isLeft && isRight ? 'text-purple-500' :
                isLeft ? 'text-blue-500' : 'text-red-500'
              }`}>
                {pointerLabel}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
