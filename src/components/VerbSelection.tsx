// src/components/VerbSelection.tsx
import React from 'react';
import conjugaisons from '../data/conjugaisonData';

interface VerbSelectionProps {
  onSelect: (verb: string) => void;
}

const VerbSelection: React.FC<VerbSelectionProps> = ({ onSelect }) => {
  const verbs = Object.keys(conjugaisons);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">
        Choisissez un verbe
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {verbs.map((verb) => (
          <button
            key={verb}
            onClick={() => onSelect(verb)}
            className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {verb}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VerbSelection;