// src/App.tsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, BookOpen, Clock, Trophy, Star } from 'lucide-react';
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
  const [showStars, setShowStars] = useState(false);
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
    setShowStars(false);
  };

  const handleVerbSelect = (verb: string) => {
    setShowStars(true);
    setSelectedVerb(verb);
  };

  const handleTempsSelect = (temps: Temps) => {
    setShowStars(true);
    setSelectedTemps(temps);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors bg-white/80 px-4 py-2 rounded-xl shadow-sm hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>

        <div className="mb-8 animate-fade-in">
          <div className="relative">
            <h1 className="text-4xl font-display font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Conjugaison
            </h1>
            <div className="absolute -top-4 -right-4 animate-bounce">
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-xl text-blue-600">
            <BookOpen className="h-6 w-6" />
            <p>Choisissez un verbe et un temps pour commencer !</p>
          </div>
        </div>

        <div className={cn(
          "transition-all duration-300 relative",
          isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}>
          {showStars && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                >
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
              ))}
            </div>
          )}

          {!selectedVerb ? (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-xl border-2 border-blue-200 transform hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="h-8 w-8 text-blue-500" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Choisissez un verbe
                </h2>
              </div>
              <VerbSelection onSelect={handleVerbSelect} />
            </div>
          ) : !selectedTemps ? (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl border-2 border-purple-200 transform hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-8 w-8 text-purple-500" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Choisissez un temps
                </h2>
              </div>
              <TempsSelection
                temps={Object.keys(conjugaisons[selectedVerb].indicatif) as Temps[]}
                onSelect={handleTempsSelect}
              />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-pink-50 to-yellow-50 rounded-3xl p-8 shadow-xl border-2 border-pink-200 transform hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl text-gray-600">Conjuguez le verbe</span>
                    <span className="text-3xl font-bold text-blue-600">{selectedVerb}</span>
                    <span className="text-xl text-gray-600">au</span>
                    <span className="text-3xl font-bold text-purple-600">{selectedTemps}</span>
                  </div>
                </div>
              </div>
              <ConjugaisonGame
                verb={selectedVerb}
                temps={selectedTemps}
                conjugationData={conjugaisons[selectedVerb].indicatif[selectedTemps]}
                onReset={handleReset}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game3;