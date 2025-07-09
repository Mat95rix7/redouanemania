import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Clock, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { useGameContext } from '../context/GameContext.tsx';
import { cn } from '@/lib/utils';
import RequireAuth from '../components/RequireAuth';
import HeaderJeu from '../components/HeaderJeu';
import MultiplicationGrid from '../components/MultiplicationGrid';
import ScoreTable from '../components/ScoreTable';

interface Multiplication {
  num1: number;
  num2: number;
  answer: number;
  userAnswer: string;
}

interface GameResult {
  username: string;
  score: number;
  date: string;
  multiplications: Multiplication[];
}

const Game2 = () => {
  const navigate = useNavigate();
  const { username } = useGameContext();
  const [timeLeft, setTimeLeft] = useState(150); // 2 minutes et 30 secondes
  const [multiplications, setMultiplications] = useState<Multiplication[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);

  // Charger les résultats précédents
  useEffect(() => {
    const savedResults = localStorage.getItem('game2Results');
    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults);
        setGameResults(parsedResults);
      } catch (error) {
        console.error('Erreur lors du chargement des résultats:', error);
        setGameResults([]);
      }
    }
  }, []);

  const generateMultiplications = () => {
    const newMultiplications: Multiplication[] = [];
    for (let i = 0; i < 20; i++) {
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      newMultiplications.push({
        num1,
        num2,
        answer: num1 * num2,
        userAnswer: ''
      });
    }
    setMultiplications(newMultiplications);
  };

  const resetGame = () => {
    setTimeLeft(150);
    setIsGameOver(false);
    setScore(0);
    generateMultiplications();
  };

  // Générer les multiplications aléatoires au démarrage
  useEffect(() => {
    generateMultiplications();
  }, []);

  // Gérer le timer
  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isGameOver) {
      handleGameOver();
    }
  }, [timeLeft, isGameOver]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newMultiplications = [...multiplications];
    newMultiplications[index].userAnswer = value;
    setMultiplications(newMultiplications);
  };

  const handleSubmit = () => {
    handleGameOver();
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    const correctAnswers = multiplications.filter(
      m => parseInt(m.userAnswer) === m.answer
    ).length;
    setScore(correctAnswers);
    
    const newResult = {
      username: username || 'Anonyme',
      score: correctAnswers,
      date: new Date().toISOString(),
      multiplications: [...multiplications]
    };

    const updatedResults = [...gameResults, newResult];
    setGameResults(updatedResults);
    
    try {
      localStorage.setItem('game2Results', JSON.stringify(updatedResults));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des résultats:', error);
    }
  };

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
                    onClick={handleSubmit}
                    className={cn(
                      "w-full py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-bold transition-all",
                      "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
                      "hover:from-blue-600 hover:to-purple-600",
                      "transform hover:scale-[1.02] active:scale-[0.98]",
                      "shadow-lg focus:ring-4 focus:ring-primary/30 focus:outline-none"
                    )}
                  >
                    Valider mes réponses
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={resetGame}
                      className={cn(
                        "w-full py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-bold transition-all",
                        "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
                        "hover:from-blue-600 hover:to-purple-600",
                        "transform hover:scale-[1.02] active:scale-[0.98]",
                        "shadow-lg focus:ring-4 focus:ring-primary/30 focus:outline-none",
                        "flex items-center justify-center gap-2"
                      )}
                    >
                      <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6" />
                      Nouvelle partie
                    </button>
                    <button
                      onClick={() => navigate('/')} 
                      className={cn(
                        "w-full py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-bold transition-all",
                        "bg-white text-blue-600 border-2 border-blue-200",
                        "hover:bg-blue-50",
                        "transform hover:scale-[1.02] active:scale-[0.98]",
                        "shadow-lg focus:ring-4 focus:ring-primary/30 focus:outline-none"
                      )}
                    >
                      Retour à l'accueil
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
                      {score === 20 ? "🎉 Parfait ! Tu es un champion !" : 
                       score >= 15 ? "👏 Excellent ! Continue comme ça !" :
                       score >= 10 ? "👍 Bien joué ! Tu progresses !" :
                       "💪 Ne t'inquiète pas, continue à t'entraîner !"}
                    </p>
                    <div className="text-sm text-blue-500">
                      {multiplications.filter(m => parseInt(m.userAnswer) !== m.answer).length} erreurs
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <ScoreTable results={gameResults} username={username || 'Anonyme'} formatDate={formatDate} />
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