// src/App.tsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useGameContext } from '../context/GameContext.tsx';
import { cn } from '@/lib/utils';
import Header from '../components/Header';
import VerbSelection from '../components/VerbSelection';
import TempsSelection from '../components/TempsSelection';
import ConjugaisonGame from '../components/ConjugaisonGame';
import conjugaisons from '../data/conjugaisonData';
import { Temps } from '../types';
import { useNavigate } from 'react-router-dom';

interface Game3Props {
  onBack: () => void;
}

const Game3: React.FC<Game3Props> = ({ onBack }) => {
  const [selectedVerb, setSelectedVerb] = useState<string | null>(null);
  const [selectedTemps, setSelectedTemps] = useState<Temps | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedVerb || selectedTemps) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedVerb, selectedTemps]);

  const handleReset = () => {
    setSelectedVerb(null);
    setSelectedTemps(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </button>

        <div className={cn(
          "transition-all duration-300",
          isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}>
          {!selectedVerb ? (
            <VerbSelection onSelect={setSelectedVerb} />
          ) : !selectedTemps ? (
            <TempsSelection
              temps={Object.keys(conjugaisons[selectedVerb].indicatif) as Temps[]}
              onSelect={setSelectedTemps}
            />
          ) : (
            <ConjugaisonGame
              verb={selectedVerb}
              temps={selectedTemps}
              conjugationData={conjugaisons[selectedVerb].indicatif[selectedTemps]}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Game3;