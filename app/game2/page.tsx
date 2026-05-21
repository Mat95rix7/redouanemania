'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, Clock } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useGameScores } from '@/hooks/useGameScores';
import { cn } from '@/lib/utils';
import RequireAuth from '@/components/RequireAuth';
import HeaderJeu from '@/components/HeaderJeu';
import MultiplicationGrid from '@/components/MultiplicationGrid';
import GameRankings from '@/components/GameRankings';

interface Multiplication {
  num1: number;
  num2: number;
  answer: number;
  userAnswer: string;
}

const createMultiplications = (): Multiplication[] =>
  Array.from({ length: 20 }, () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    return { num1, num2, answer: num1 * num2, userAnswer: '' };
  });

const Game2: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const { saveScore } = useGameScores('game2');

  const [timeLeft, setTimeLeft] = useState(150);
  const [multiplications, setMultiplications] = useState<Multiplication[]>(() => createMultiplications());
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const multiplicationsRef = useRef(multiplications);
  useEffect(() => {
    multiplicationsRef.current = multiplications;
  }, [multiplications]);

  const handleGameOver = useCallback(async () => {
    setIsGameOver(true);
    const correctAnswers = multiplicationsRef.current.filter(
      m => parseInt(m.userAnswer) === m.answer
    ).length;
    setScore(correctAnswers);
    await saveScore(correctAnswers);
  }, [saveScore]);

  const resetGame = () => {
    setTimeLeft(150);
    setIsGameOver(false);
    setScore(0);
    setMultiplications(createMultiplications());
  };

  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver, handleGameOver]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (index: number, value: string) => {
    setMultiplications(prev => {
      const updated = [...prev];
      updated[index].userAnswer = value;
      return updated;
    });
  };

  const erreurs = multiplications.filter(
    m => parseInt(m.userAnswer) !== m.answer
  ).length;

  const message =
    score === 20 ? '🎉 Parfait ! Tu es un champion !' :
    score >= 15  ? '👏 Excellent ! Continue comme ça !' :
    score >= 10  ? '👍 Bien joué ! Tu progresses !' :
                   "💪 Ne t'inquiète pas, continue à t'entraîner !";

  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
        <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
          <HeaderJeu />

          <div className="mt-8 flex flex-col gap-6">

            {/* Zone de jeu */}
            <div className="bg-white/80 rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-blue-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center sm:text-left">
                  Multiplication Rapide
                </h2>
                <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-blue-600 bg-white/80 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl shadow-lg">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                  {formatTime(timeLeft)}
                </div>
              </div>

              <MultiplicationGrid
                multiplications={multiplications}
                isGameOver={isGameOver}
                onAnswerChange={handleAnswerChange}
              />

              {!isGameOver ? (
                <button
                  onClick={handleGameOver}
                  className={cn(
                    'w-full py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-bold transition-all',
                    'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
                    'hover:from-blue-600 hover:to-purple-600',
                    'transform hover:scale-[1.02] active:scale-[0.98]',
                    'shadow-lg focus:ring-4 focus:ring-primary/30 focus:outline-none'
                  )}
                >
                  Valider mes réponses
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={resetGame}
                    className={cn(
                      'w-full py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-bold transition-all',
                      'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
                      'hover:from-blue-600 hover:to-purple-600',
                      'transform hover:scale-[1.02] active:scale-[0.98]',
                      'shadow-lg focus:ring-4 focus:ring-primary/30 focus:outline-none',
                      'flex items-center justify-center gap-2'
                    )}
                  >
                    <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6" /> Nouvelle partie
                  </button>
                  <button
                    onClick={() => router.push('/')}
                    className={cn(
                      'w-full py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-bold transition-all',
                      'bg-white text-blue-600 border-2 border-blue-200',
                      'hover:bg-blue-50',
                      'transform hover:scale-[1.02] active:scale-[0.98]',
                      'shadow-lg focus:ring-4 focus:ring-primary/30 focus:outline-none'
                    )}
                  >
                    Retour à l&apos;accueil
                  </button>
                </div>
              )}
            </div>

            {/* Résultat + classements */}
            {isGameOver && (
              <>
                <div className="bg-white/80 rounded-3xl p-6 shadow-xl border-2 border-blue-200 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{score}/20</div>
                  <p className="text-lg text-blue-600 mb-2">{message}</p>
                  <div className="text-sm text-blue-500">{erreurs} erreur{erreurs > 1 ? 's' : ''}</div>
                </div>

                <GameRankings gameKey="game2" />
              </>
            )}

          </div>
        </main>
      </div>
    </RequireAuth>
  );
};

export default Game2;