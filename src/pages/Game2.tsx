import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useGameContext } from '../context/GameContext';

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
      <div className="bg-white rounded-xl p-4 shadow-lg">
        <h3 className="text-lg font-bold mb-3">Mon historique</h3>
        <div className="space-y-2">
          {userResults.map((result, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{formatDate(result.date)}</span>
              </div>
              <span className="font-bold text-primary">{result.score}/20</span>
            </div>
          ))}
          {userResults.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              Aucun résultat enregistré
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </button>

      <div className="max-w-6xl w-full flex gap-6">
        <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              Multiplication Rapide (20 questions)
            </h2>
            <div className="text-lg font-medium">
              Temps: {formatTime(timeLeft)}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {multiplications.map((m, index) => (
              <div key={index} className={`p-4 rounded-lg ${isGameOver ? 'bg-gray-50' : 'bg-gray-50'}`}>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-2xl font-bold text-gray-800">
                    {m.num1} × {m.num2} =
                  </div>
                  {!isGameOver ? (
                    <input
                      type="number"
                      value={m.userAnswer}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      className="w-24 px-3 py-2 rounded-lg border text-center text-lg font-medium focus:ring-2 focus:ring-primary/50 focus:outline-none"
                      placeholder="?"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <div className={`text-xl font-bold ${parseInt(m.userAnswer) === m.answer ? 'text-green-600' : 'text-red-600'}`}>
                        {m.answer}
                      </div>
                      {parseInt(m.userAnswer) !== m.answer && (
                        <div className="text-sm text-red-500">
                          Votre réponse: {m.userAnswer || 'Non répondu'}
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
              className="w-full py-3 px-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Valider les réponses
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-3 px-4 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                Retour à l'accueil
              </button>
              <button
                onClick={resetGame}
                className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Rejouer
              </button>
            </div>
          )}
        </div>

        <div className="w-80 flex flex-col gap-4">
          {isGameOver && (
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-5xl font-bold text-primary mb-2">
                {score}/20
              </div>
              <p className="text-gray-600 mb-4">
                {score === 20 ? "Parfait ! 🎉" : 
                 score >= 15 ? "Excellent ! 👏" :
                 score >= 10 ? "Bien ! 👍" :
                 "Continue à t'entraîner ! 💪"}
              </p>
              <div className="text-sm text-gray-500">
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