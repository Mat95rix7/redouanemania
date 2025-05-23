import React from 'react';
import { Temps } from '../types';

interface TempsSelectionProps {
  temps: Temps[];
  onSelect: (temps: Temps) => void;
}

const TempsSelection: React.FC<TempsSelectionProps> = ({ temps, onSelect }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">
        Choisissez un temps
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {temps.map((t) => (
          <button
            key={t}
            onClick={() => onSelect(t)}
            className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TempsSelection; 