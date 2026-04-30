'use client';

import React, { useState } from 'react';
import { Sparkles, BookOpen, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import VerbSelection from '@/components/VerbSelection';
import TempsSelection from '@/components/TempsSelection';
import ConjugaisonGame from '@/components/ConjugaisonGame';
import conjugaisons from '@/data/conjugaisonData';
import RequireAuth from '@/components/RequireAuth';
import HeaderJeu from '@/components/HeaderJeu';
import type { Temps } from '@/types';

/* ================= TYPES ================= */

export type Verbe = keyof typeof conjugaisons;

/* ================= COMPONENT ================= */

export default function Game5() {
  const [selectedVerb, setSelectedVerb] = useState<Verbe | null>(null);
  const [selectedTemps, setSelectedTemps] = useState<Temps | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showStars, setShowStars] = useState(false);

  const [floatingElements] = useState(() =>
    [...Array(5)].map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: i * 0.2,
    }))
  );

  const handleVerbSelect = (verb: Verbe) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedVerb(verb);
      setShowStars(true);
      setIsAnimating(false);
    }, 300);
  };

  const handleTempsSelect = (temps: Temps) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedTemps(temps);
      setShowStars(true);
      setIsAnimating(false);
    }, 300);
  };

  const handleReset = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedVerb(null);
      setSelectedTemps(null);
      setShowStars(false);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
        <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
          <HeaderJeu />

          <div className="mt-8">
            <div className="mb-6 sm:mb-8 animate-fade-in">
              <div className="relative">
                <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2 sm:mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Conjugaison
                </h1>
                <div className="absolute -top-4 -right-4 animate-bounce">
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 text-base sm:text-xl text-blue-600">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
                <p>Choisissez un verbe et un temps pour commencer !</p>
              </div>
            </div>

            <div className={cn('transition-all duration-300 relative', isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100')}>
              {showStars && (
                <div className="absolute inset-0 pointer-events-none">
                  {floatingElements.map((el, i) => (
                    <div key={i} className="absolute animate-float" style={{ left: `${el.left}%`, top: `${el.top}%`, animationDelay: `${el.delay}s` }}>
                      <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                    </div>
                  ))}
                </div>
              )}

              {!selectedVerb && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-xl border-2 border-blue-200">
                  <VerbSelection onSelect={handleVerbSelect} />
                </div>
              )}

              {selectedVerb && !selectedTemps && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-xl border-2 border-purple-200">
                  <TempsSelection
                    temps={Object.keys(conjugaisons[selectedVerb].indicatif ?? {}) as Temps[]}
                    onSelect={handleTempsSelect}
                  />
                </div>
              )}

              {selectedVerb && selectedTemps && (
                <div className="bg-gradient-to-br from-pink-50 to-yellow-50 rounded-2xl p-6 shadow-xl border-2 border-pink-200">
                  <ConjugaisonGame
                    verb={selectedVerb}
                    temps={selectedTemps}
                    conjugationData={conjugaisons[selectedVerb].indicatif?.[selectedTemps]!}
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