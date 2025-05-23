import React from 'react';
import { Temps } from '../types';
import { cn } from '@/lib/utils';

interface TempsSelectionProps {
  temps: Temps[];
  onSelect: (temps: Temps) => void;
}

const TempsSelection: React.FC<TempsSelectionProps> = ({ temps, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {temps.map((t) => (
          <button
            key={t}
            onClick={() => onSelect(t)}
            className={cn(
              "px-6 py-4 rounded-2xl transition-all duration-300",
              "bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-lg",
              "hover:from-purple-600 hover:to-pink-600",
              "transform hover:scale-105 active:scale-95",
              "shadow-lg hover:shadow-xl",
              "focus:outline-none focus:ring-4 focus:ring-purple-500/50",
              "border-2 border-purple-400/50"
            )}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TempsSelection; 