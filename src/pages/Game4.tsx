import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Globe, Clock, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import EnglishConjugationGame from '../components/EnglishConjugationGame';
import { englishVerbs } from '../data/englishConjugationData';

const Game4 = () => {
  const navigate = useNavigate();
  const [selectedVerb, setSelectedVerb] = useState<string | null>(null);
  const [selectedTense, setSelectedTense] = useState<'present' | 'past' | 'future' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showStars, setShowStars] = useState(false);

  const handleVerbSelect = (verb: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedVerb(verb);
      setIsAnimating(false);
      setShowStars(true);
      setTimeout(() => setShowStars(false), 1000);
    }, 300);
  };

  const handleTenseSelect = (tense: 'present' | 'past' | 'future') => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedTense(tense);
      setIsAnimating(false);
      setShowStars(true);
      setTimeout(() => setShowStars(false), 1000);
    }, 300);
  };

  const handleReset = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedVerb(null);
      setSelectedTense(null);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors bg-white/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-sm hover:scale-105 active:scale-95 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back
        </button>

        <div className="mb-6 sm:mb-8 animate-fade-in">
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2 sm:mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              English Conjugation
            </h1>
            <div className="absolute -top-4 -right-4 animate-bounce">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-base sm:text-xl text-blue-600">
            <Globe className="h-5 w-5 sm:h-6 sm:w-6" />
            <p>Choose a verb and a tense to start!</p>
          </div>
        </div>

        <div className={cn(
          "transition-all duration-300 relative",
          isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}>
          {!selectedVerb ? (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-blue-200 transform hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Choose a verb
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {Object.keys(englishVerbs).map((verb) => (
                  <button
                    key={verb}
                    onClick={() => handleVerbSelect(verb)}
                    className="p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-left hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="text-base sm:text-lg font-medium text-blue-600">{verb}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : !selectedTense ? (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-purple-200 transform hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Choose a tense
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['present', 'past', 'future'].map((tense) => (
                  <button
                    key={tense}
                    onClick={() => handleTenseSelect(tense as 'present' | 'past' | 'future')}
                    className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-left hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="text-lg font-medium text-purple-600 capitalize">{tense}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-pink-50 to-yellow-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-pink-200 transform hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                    <span className="text-base sm:text-xl text-gray-600">Conjugate the verb</span>
                    <span className="text-2xl sm:text-3xl font-bold text-blue-600">{selectedVerb}</span>
                    <span className="text-base sm:text-xl text-gray-600">in the</span>
                    <span className="text-2xl sm:text-3xl font-bold text-purple-600 capitalize">{selectedTense}</span>
                    <span className="text-base sm:text-xl text-gray-600">tense</span>
                  </div>
                </div>
              </div>
              <EnglishConjugationGame
                verb={selectedVerb}
                tense={selectedTense}
                conjugationData={englishVerbs[selectedVerb][selectedTense]}
                onReset={handleReset}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game4; 