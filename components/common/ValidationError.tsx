// components/common/ValidationError.tsx
import React, { useState, useEffect } from 'react';

interface ValidationErrorProps {
  message: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export const ValidationError: React.FC<ValidationErrorProps> = ({
  message,
  duration = 4000,
  onClose,
  className = '',
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible || !message) return null;

  return (
    <div className={`text-xs bg-rose-500/10 text-rose-500 border border-rose-500/25 rounded-lg p-2.5 flex items-center gap-2 ${className}`}>
      <i className="fa-solid fa-circle-exclamation" />
      <span>{message}</span>
    </div>
  );
};
