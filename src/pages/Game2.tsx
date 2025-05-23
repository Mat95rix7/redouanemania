import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Clock, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { useGameContext } from '../context/GameContext.tsx';
import { cn } from '@/lib/utils';

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

  const ScoreTable = () => {
    const userResults = gameResults
      .filter(result => result.username === username)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
      <div className="bg-white/80 rounded-2xl p-6 shadow-xl border-2 border-blue-200">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">Mon historique</h3>
        <div className="space-y-3">
          {userResults.map((result, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-blue-100 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="text-lg text-blue-600">{formatDate(result.date)}</span>
              </div>
              <span className="text-xl font-bold text-blue-600">{result.score}/20</span>
            </div>
          ))}
          {userResults.length === 0 && (
            <div className="text-center text-blue-500 py-6 text-lg">
              Aucun résultat enregistré
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors bg-white/80 px-4 py-2 rounded-xl shadow-sm"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour
      </button>

      <div className="max-w-6xl w-full flex gap-6">
        <div className="flex-1 bg-white/80 rounded-3xl p-8 shadow-xl border-2 border-blue-200">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-blue-600">
              Multiplication Rapide
            </h2>
            <div className="flex items-center gap-2 text-xl font-bold text-blue-600 bg-white/80 px-6 py-3 rounded-2xl shadow-lg">
              <Clock className="h-6 w-6" />
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {multiplications.map((m, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-6 rounded-2xl transition-all duration-300",
                  "border-2 shadow-lg",
                  isGameOver 
                    ? parseInt(m.userAnswer) === m.answer
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                    : "bg-white/50 border-blue-200 hover:border-blue-300"
                )}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="text-3xl font-bold text-blue-600">
                    {m.num1} × {m.num2}
                  </div>
                  {!isGameOver ? (
                    <input
                      type="number"
                      value={m.userAnswer}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      className="w-32 px-4 py-3 rounded-xl border-2 text-center text-2xl font-bold focus:ring-4 focus:ring-blue-500/50 focus:outline-none bg-white/80"
                      placeholder="?"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-2xl font-bold">
                        {parseInt(m.userAnswer) === m.answer ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-6 w-6" />
                            {m.answer}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-600">
                            <XCircle className="h-6 w-6" />
                            {m.answer}
                          </div>
                        )}
                      </div>
                      {parseInt(m.userAnswer) !== m.answer && (
                        <div className="text-lg text-red-500">
                          Ta réponse: {m.userAnswer || 'Non répondu'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {!isGameOver ? (
            <button
              onClick={handleSubmit}
              className={cn(
                "w-full py-4 rounded-2xl text-xl font-bold transition-all",
                "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
                "hover:from-blue-600 hover:to-purple-600",
                "transform hover:scale-[1.02] active:scale-[0.98]",
                "shadow-lg focus:ring-4 focus:ring-primary/30 focus:outline-none"
              )}
            >
              Valider mes réponses
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/')}
                className={cn(
                  "flex-1 py-4 rounded-2xl text-xl font-bold transition-all",
                  "bg-white text-blue-600 border-2 border-blue-200",
                  "hover:bg-blue-50 hover:border-blue-300",
                  "transform hover:scale-[1.02] active:scale-[0.98]",
                  "shadow-lg focus:ring-4 focus:ring-blue-500/30 focus:outline-none"
                )}
              >
                Retour à l'accueil
              </button>
              <button
                onClick={resetGame}
                className={cn(
                  "flex-1 py-4 rounded-2xl text-xl font-bold transition-all",
                  "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
                  "hover:from-blue-600 hover:to-purple-600",
                  "transform hover:scale-[1.02] active:scale-[0.98]",
                  "shadow-lg focus:ring-4 focus:ring-primary/30 focus:outline-none",
                  "flex items-center justify-center gap-2"
                )}
              >
                <RefreshCw className="w-5 h-5" />
                Rejouer
              </button>
            </div>
          )}
        </div>

        <div className="w-96 flex flex-col gap-6">
          {isGameOver && (
            <div className="bg-white/80 rounded-3xl p-8 shadow-xl border-2 border-blue-200 text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">
                {score}/20
              </div>
              <p className="text-2xl text-blue-600 mb-6">
                {score === 20 ? "🎉 Parfait ! Tu es un champion !" : 
                 score >= 15 ? "👏 Excellent ! Continue comme ça !" :
                 score >= 10 ? "👍 Bien joué ! Tu progresses !" :
                 "💪 Ne t'inquiète pas, continue à t'entraîner !"}
              </p>
              <div className="text-lg text-blue-500">
                {multiplications.filter(m => parseInt(m.userAnswer) !== m.answer).length} erreurs
              </div>
            </div>
          )}
          <ScoreTable />
        </div>
      </div>
    </div>
  );
};

export default Game2; 