'use client';

import React, { useEffect, useState } from 'react';
import { Pronom, ConjugaisonParTemps } from '../types';
import { cn } from '../lib/utils';
import { Verb, IndicatifTemps } from '@/app/game5/page';

interface ConjugaisonGameProps {
  verb: Verb;
  temps: IndicatifTemps;
  conjugationData: ConjugaisonParTemps;
  onReset?: () => void;
}

const PRONOMS_ORDER: Pronom[] = [
  'je',
  'tu',
  'il/elle',
  'nous',
  'vous',
  'ils/elles',
];

const emptyAnswers = (): ConjugaisonParTemps => ({
  je: '',
  tu: '',
  'il/elle': '',
  nous: '',
  vous: '',
  'ils/elles': '',
});

const ConjugaisonGame: React.FC<ConjugaisonGameProps> = ({
  verb,
  temps,
  conjugationData,
  onReset,
}) => {
  const [userAnswers, setUserAnswers] =
    useState<ConjugaisonParTemps>(emptyAnswers);

  const [validatedAnswers, setValidatedAnswers] =
    useState<Record<Pronom, boolean>>({} as Record<Pronom, boolean>);

  const [message, setMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);

  const [showResult, setShowResult] =
    useState<'correct' | 'incorrect' | null>(null);

  /* ===== RESET ON CHANGE ===== */
  useEffect(() => {
    setUserAnswers(emptyAnswers());
    setValidatedAnswers({} as Record<Pronom, boolean>);
    setMessage(null);
    setShowResult(null);
  }, [conjugationData, verb, temps]);

  /* ===== HELPERS ===== */
  const normalize = (v: string) =>
    v
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  /* ===== CHECK ===== */
  const checkAnswers = () => {
    let allCorrect = true;
    const result = {} as Record<Pronom, boolean>;

    PRONOMS_ORDER.forEach((p) => {
      const ok =
        normalize(userAnswers[p]) === normalize(conjugationData[p]);
      result[p] = ok;
      if (!ok) allCorrect = false;
    });

    setValidatedAnswers(result);
    setShowResult(allCorrect ? 'correct' : 'incorrect');
    setTimeout(() => setShowResult(null), 1500);

    setMessage(
      allCorrect
        ? { text: 'Bravo ! Toutes les réponses sont correctes !', type: 'success' }
        : {
            text: 'Certaines réponses sont incorrectes.',
            type: 'error',
          }
    );
  };

  /* ===== RESET ===== */
  const resetGame = () => {
    setUserAnswers(emptyAnswers());
    setValidatedAnswers({} as Record<Pronom, boolean>);
    setMessage(null);
    setShowResult(null);
    onReset?.();
  };

  /* ===== RENDER ===== */
  return (
    <div className="space-y-6 relative">
      {showResult && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-lg z-10',
            showResult === 'correct'
              ? 'bg-green-500/20'
              : 'bg-red-500/20'
          )}
        >
          <div
            className={cn(
              'text-6xl font-bold',
              showResult === 'correct'
                ? 'text-green-500'
                : 'text-red-500'
            )}
          >
            {showResult === 'correct' ? 'Correct !' : 'Incorrect !'}
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {PRONOMS_ORDER.map((p) => (
          <div key={p} className="flex items-center gap-4">
            <label className="w-1/6 font-medium">{p}</label>
            <input
              value={userAnswers[p]}
              onChange={(e) =>
                setUserAnswers((prev) => ({
                  ...prev,
                  [p]: e.target.value,
                }))
              }
              className={cn(
                'flex-1 px-4 py-2 border rounded-lg',
                validatedAnswers[p] === true &&
                  'bg-green-50 border-green-500',
                validatedAnswers[p] === false &&
                  'bg-red-50 border-red-500'
              )}
            />
          </div>
        ))}
      </div>

      {message && (
        <div
          className={cn(
            'p-4 rounded-lg text-center',
            message.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          )}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-center gap-4">
        <button
          onClick={checkAnswers}
          className="px-6 py-2 text-white bg-blue-600 rounded-lg"
        >
          Vérifier
        </button>
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-gray-200 rounded-lg"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default ConjugaisonGame;