'use client';

import React, { useState } from 'react';
import { Sparkles, Globe, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import EnglishConjugationGame from '@/components/EnglishConjugationGame';
import { englishVerbs } from '@/data/englishConjugationData';
import RequireAuth from '@/components/RequireAuth';
import HeaderJeu from '@/components/HeaderJeu';

/* ================= TYPES ================= */

export type Verb = keyof typeof englishVerbs;
export type Tense = 'present' | 'past' | 'future';

/* ================= COMPONENT ================= */

export default function Game4() {
  const [selectedVerb, setSelectedVerb] = useState<Verb | null>(null);
  const [selectedTense, setSelectedTense] = useState<Tense | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showStars, setShowStars] = useState(false);

  const [floatingElements] = useState(() =>
    [...Array(5)].map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: i * 0.2,
    }))
  );

  /* ================= HANDLERS ================= */

  const handleVerbSelect = (verb: Verb) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedVerb(verb);
      setIsAnimating(false);
      setShowStars(true);
      setTimeout(() => setShowStars(false), 1000);
    }, 300);
  };

  const handleTenseSelect = (tense: Tense) => {
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
      setShowStars(false);
      setIsAnimating(false);
    }, 300);
  };

  /* ================= RENDER ================= */

  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
        <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
          <HeaderJeu />

          <div className="mt-8">
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

            <div
              className={cn(
                'transition-all duration-300 relative',
                isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              )}
            >
              {/* ⭐ Stars */}
              {showStars && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  {floatingElements.map((el, i) => (
                    <div
                      key={i}
                      className="absolute animate-float"
                      style={{
                        left: `${el.left}%`,
                        top: `${el.top}%`,
                        animationDelay: `${el.delay}s`,
                      }}
                    >
                      <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-yellow-400" />
                    </div>
                  ))}
                </div>
              )}

              {/* ================= STEP 1 ================= */}
              {!selectedVerb && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-blue-200">
                  <h2 className="text-xl sm:text-2xl font-bold mb-6 text-blue-600">
                    Choose a verb
                  </h2>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {(Object.keys(englishVerbs) as Verb[]).map((verb) => (
                      <button
                        key={verb}
                        onClick={() => handleVerbSelect(verb)}
                        className="p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                      >
                        <span className="text-base sm:text-lg font-medium text-blue-600">
                          {verb}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= STEP 2 ================= */}
              {selectedVerb && !selectedTense && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-purple-200">
                  <h2 className="text-xl sm:text-2xl font-bold mb-6 text-purple-600">
                    Choose a tense
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(['present', 'past', 'future'] as Tense[]).map((tense) => (
                      <button
                        key={tense}
                        onClick={() => handleTenseSelect(tense)}
                        className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                      >
                        <span className="text-lg font-medium text-purple-600 capitalize">
                          {tense}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= GAME ================= */}
              {selectedVerb && selectedTense && (
                <div className="bg-gradient-to-br from-pink-50 to-yellow-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-pink-200">
                  <EnglishConjugationGame
                    verb={selectedVerb}
                    tense={selectedTense}
                    conjugationData={
                      englishVerbs[selectedVerb][selectedTense]
                    }
                    onReset={handleReset}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </RequireAuth>
  );
}