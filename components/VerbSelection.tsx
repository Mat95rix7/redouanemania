// src/components/VerbSelection.tsx
import React from 'react';
import conjugaisons from '../data/conjugaisonData';
import { cn } from '@/lib/utils';

interface VerbSelectionProps {
  onSelect: (verb: string) => void;
}

const VerbSelection: React.FC<VerbSelectionProps> = ({ onSelect }) => {
  const verbs = Object.keys(conjugaisons);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {verbs.map((verb) => (
          <button
            key={verb}
            onClick={() => onSelect(verb)}
            className={cn(
              "px-6 py-4 rounded-2xl transition-all duration-300",
              "bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-lg",
              "hover:from-blue-600 hover:to-purple-600",
              "transform hover:scale-105 active:scale-95",
              "shadow-lg hover:shadow-xl",
              "focus:outline-none focus:ring-4 focus:ring-blue-500/50",
              "border-2 border-blue-400/50"
            )}
          >
            {verb}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VerbSelection;