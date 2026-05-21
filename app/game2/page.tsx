// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { RefreshCw, Clock } from 'lucide-react';
// import { useGameContext } from '@/context/GameContext';
// import { cn } from '@/lib/utils';
// import RequireAuth from '@/components/RequireAuth';
// import HeaderJeu from '@/components/HeaderJeu';
// import MultiplicationGrid from '@/components/MultiplicationGrid';
// import ScoreTable from '@/components/ScoreTable';

// interface Multiplication {
//   num1: number;
//   num2: number;
//   answer: number;
//   userAnswer: string;
// }

// interface GameResult {
//   pseudo: string;
//   score: number;
//   date: string;
//   multiplications: Multiplication[];
// }

// // Fonction helper pour générer les multiplications
// const createMultiplications = (): Multiplication[] => {
//   const newMultiplications: Multiplication[] = [];
//   for (let i = 0; i < 20; i++) {
//     const num1 = Math.floor(Math.random() * 10);
//     const num2 = Math.floor(Math.random() * 10);
//     newMultiplications.push({ num1, num2, answer: num1 * num2, userAnswer: '' });
//   }
//   return newMultiplications;
// };

// const Game2: React.FC = () => {
//   const router = useRouter();
//   const { pseudo } = useGameContext();
  
//   const [timeLeft, setTimeLeft] = useState(150); // 2 min 30 sec
//   const [multiplications, setMultiplications] = useState<Multiplication[]>(() => createMultiplications());
//   const [isGameOver, setIsGameOver] = useState(false);
//   const [score, setScore] = useState(0);
//   const [gameResults, setGameResults] = useState<GameResult[]>([]);
  
//   // Utiliser une ref pour éviter les dépendances
//   const multiplicationsRef = useRef(multiplications);
  
//   // Garder la ref à jour
//   useEffect(() => {
//     multiplicationsRef.current = multiplications;
//   }, [multiplications]);

//   const handleGameOver = useCallback(() => {
//     setIsGameOver(true);
//     // On utilise la ref pour avoir la valeur la plus récente sans ajouter de dépendance cyclique
//     const correctAnswers = multiplicationsRef.current.filter(m => parseInt(m.userAnswer) === m.answer).length;
//     setScore(correctAnswers);

//     const newResult: GameResult = {
//       pseudo: pseudo || 'Anonyme',
//       score: correctAnswers,
//       date: new Date().toISOString(),
//       multiplications: [...multiplicationsRef.current],
//     };

//     setGameResults(prev => [...prev, newResult]);
//   }, [pseudo]); 

//   const resetGame = () => {
//     setTimeLeft(150);
//     setIsGameOver(false);
//     setScore(0);
//     setMultiplications(createMultiplications());
//   };

//   // --- FIXED TIMER LOGIC ---
//   useEffect(() => {
//     // Si le jeu est fini, on ne fait rien
//     if (isGameOver) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         // On vérifie si le temps est écoulé DANS le callback
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleGameOver(); // Déclenchement du Game Over
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [isGameOver, handleGameOver]); // Note: timeLeft n'est plus une dépendance

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   const formatDate = (dateString: string) =>
//     new Date(dateString).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' });

//   const handleAnswerChange = (index: number, value: string) => {
//     setMultiplications(prev => {
//       const newMultiplications = [...prev];
//       newMultiplications[index].userAnswer = value;
//       return newMultiplications;
//     });
//   };

//   const handleSubmit = () => handleGameOver();

//   return (
//     <RequireAuth>
//       <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
//         <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
//           <HeaderJeu />

//           <div className="mt-8">
//             <div className="max-w-6xl w-full flex flex-col gap-6">
//               <div className="flex-1 bg-white/80 rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-blue-200">
//                 <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8">
//                   <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center sm:text-left">
//                     Multiplication Rapide
//                   </h2>
//                   <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-blue-600 bg-white/80 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl shadow-lg">
//                     <Clock className="h-5 w-5 sm:h-6 sm:w-6" /> {formatTime(timeLeft)}
//                   </div>
//                 </div>

//                 <MultiplicationGrid
//                   multiplications={multiplications}
//                   isGameOver={isGameOver}
//                   onAnswerChange={handleAnswerChange}
//                 />

//                 {!isGameOver ? (
//                   <button
//                     onClick={handleSubmit}
//                     className={cn(
//                       "w-full py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-bold transition-all",
//                       "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
//                       "hover:from-blue-600 hover:to-purple-600",
//                       "transform hover:scale-[1.02] active:scale-[0.98]",
//                       "shadow-lg focus:ring-4 focus:ring-primary/30 focus:outline-none"
//                     )}
//                   >
//                     Valider mes réponses
//                   </button>
//                 ) : (
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <button
//                       onClick={resetGame}
//                       className={cn(
//                         "w-full py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-bold transition-all",
//                         "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
//                         "hover:from-blue-600 hover:to-purple-600",
//                         "transform hover:scale-[1.02] active:scale-[0.98]",
//                         "shadow-lg focus:ring-4 focus:ring-primary/30 focus:outline-none",
//                         "flex items-center justify-center gap-2"
//                       )}
//                     >
//                       <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6" /> Nouvelle partie
//                     </button>
//                     <button
//                       onClick={() => router.push('/')}
//                       className={cn(
//                         "w-full py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-bold transition-all",
//                         "bg-white text-blue-600 border-2 border-blue-200",
//                         "hover:bg-blue-50",
//                         "transform hover:scale-[1.02] active:scale-[0.98]",
//                         "shadow-lg focus:ring-4 focus:ring-primary/30 focus:outline-none"
//                       )}
//                     >
//                       Retour à l&apos;accueil
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 {isGameOver && (
//                   <div className="bg-white/80 rounded-3xl p-6 shadow-xl border-2 border-blue-200 text-center flex-1">
//                     <div className="text-4xl font-bold text-blue-600 mb-2">{score}/20</div>
//                     <p className="text-lg text-blue-600 mb-4">
//                       {score === 20
//                         ? "🎉 Parfait ! Tu es un champion !"
//                         : score >= 15
//                         ? "👏 Excellent ! Continue comme ça !"
//                         : score >= 10
//                         ? "👍 Bien joué ! Tu progresses !"
//                         : "💪 Ne t'inquiète pas, continue à t'entraîner !"}
//                     </p>
//                     <div className="text-sm text-blue-500">
//                       {multiplications.filter(m => parseInt(m.userAnswer) !== m.answer).length} erreurs
//                     </div>
//                   </div>
//                 )}
//                 <div className="flex-1">
//                   <ScoreTable results={gameResults} pseudo={pseudo || 'Anonyme'} formatDate={formatDate} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </RequireAuth>
//   );
// };

// export default Game2;

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
import ScoreTable from '@/components/ScoreTable';

interface Multiplication {
  num1: number;
  num2: number;
  answer: number;
  userAnswer: string;
}

const createMultiplications = (): Multiplication[] => {
  const newMultiplications: Multiplication[] = [];
  for (let i = 0; i < 20; i++) {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    newMultiplications.push({ num1, num2, answer: num1 * num2, userAnswer: '' });
  }
  return newMultiplications;
};

const Game2: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const { topScores, myTopScores, saveScore, fetchTopScores } = useGameScores('game2');

  const pseudo = user?.pseudo || 'Anonyme';

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
    await fetchTopScores();
  }, [saveScore, fetchTopScores]);

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
      const newMultiplications = [...prev];
      newMultiplications[index].userAnswer = value;
      return newMultiplications;
    });
  };

  const handleSubmit = () => handleGameOver();

  // Formate les scores Firebase pour ScoreTable
  // ScoreTable attend { pseudo, score, date }[]
  // On reconstruit depuis topScores globaux + myTopScores
  const gameResults = topScores.map(s => ({
    pseudo: s.pseudo,
    score: s.score,
    date: '',
    multiplications: [] as Multiplication[],
  }));

  console.log(gameResults)

  const formatDate = (dateString: string) =>
    dateString
      ? new Date(dateString).toLocaleDateString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        })
      : '';

  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
        <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
          <HeaderJeu />

          <div className="mt-8">
            <div className="max-w-6xl w-full flex flex-col gap-6">
              <div className="flex-1 bg-white/80 rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-blue-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center sm:text-left">
                    Multiplication Rapide
                  </h2>
                  <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-blue-600 bg-white/80 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl shadow-lg">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6" /> {formatTime(timeLeft)}
                  </div>
                </div>

                <MultiplicationGrid
                  multiplications={multiplications}
                  isGameOver={isGameOver}
                  onAnswerChange={handleAnswerChange}
                />

                {!isGameOver ? (
                  <button
                    onClick={handleSubmit}
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

              <div className="flex flex-col sm:flex-row gap-4">
                {isGameOver && (
                  <div className="bg-white/80 rounded-3xl p-6 shadow-xl border-2 border-blue-200 text-center flex-1">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {score}/20
                    </div>
                    <p className="text-lg text-blue-600 mb-4">
                      {score === 20
                        ? '🎉 Parfait ! Tu es un champion !'
                        : score >= 15
                        ? '👏 Excellent ! Continue comme ça !'
                        : score >= 10
                        ? '👍 Bien joué ! Tu progresses !'
                        : "💪 Ne t'inquiète pas, continue à t'entraîner !"}
                    </p>
                    <div className="text-sm text-blue-500">
                      {multiplications.filter(m => parseInt(m.userAnswer) !== m.answer).length} erreurs
                    </div>
                    {myTopScores.length > 0 && (
                      <div className="mt-4 text-sm text-blue-500">
                        Tes meilleurs scores :{' '}
                        {myTopScores.map(s => s.score).join(' · ')}
                      </div>
                    )}
                  </div>
                )}
                <div className="flex-1">
                  <ScoreTable
                    scores={myTopScores}
                    pseudo={pseudo}
                    // formatDate={formatDate}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </RequireAuth>
  );
};

export default Game2;