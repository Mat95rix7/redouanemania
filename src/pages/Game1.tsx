import React, { useState, useRef, useEffect } from 'react';
import RequireAuth from '../components/RequireAuth';
import TableSelector from '../components/TableSelector';
import { useUser } from '../context/UserContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Check, X, Star, Award, RotateCcw, Home, ChevronRight, Sparkles, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import HeaderJeu from '../components/HeaderJeu';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const TOTAL_QUESTIONS = 10;
const SCORING_SYSTEM = {
  CORRECT_ANSWER: 100,
  SPEED_BONUS: {
    UNDER_3_SEC: 50,
    UNDER_5_SEC: 30,
    UNDER_8_SEC: 10
  },
  STREAK_BONUS: {
    STREAK_3: 25,
    STREAK_5: 50,
    STREAK_7: 75,
    STREAK_10: 100
  }
};

type GameResult = {
  operation: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  points: number;
};

const Game1 = () => {
  const { user, updateScore } = useUser();
  const [step, setStep] = useState<'select' | 'quiz' | 'results'>('select');
  const [selectedTables, setSelectedTables] = useState<number[]>([]);
  const [quizResults, setQuizResults] = useState<GameResult[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [operation, setOperation] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [showResult, setShowResult] = useState<"correct" | "incorrect" | null>(null);
  const [points, setPoints] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  // Ajout pour la partie quiz
  const [userInput, setUserInput] = useState('');
  const [questionStart, setQuestionStart] = useState(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);
  // Ajout pour le classement top 3
  const [topScores, setTopScores] = useState<{pseudo: string, score: number}[]>([]);
  const [showRankings, setShowRankings] = useState(false);

  useEffect(() => {
    if (step === 'select' || step === 'results') {
      const fetchTopScores = async () => {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        // Récupérer tous les scores de tous les utilisateurs
        const allScores: {pseudo: string, score: number}[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data.scores && data.scores.game1) {
            if (Array.isArray(data.scores.game1)) {
              data.scores.game1.forEach((score: number) => {
                allScores.push({ pseudo: data.pseudo, score });
              });
            } else if (typeof data.scores.game1 === 'number') {
              allScores.push({ pseudo: data.pseudo, score: data.scores.game1 });
            }
          }
        });
        allScores.sort((a, b) => b.score - a.score);
        // Debug log
        console.log('Top 3 global récupérés:', allScores.slice(0, 3));
        setTopScores(allScores.slice(0, 3));
      };
      fetchTopScores();
    }
  }, [step]);

  // Remise à zéro de l'input et du timer à chaque nouvelle question
  useEffect(() => {
    if (step === 'quiz') {
      setUserInput('');
      setQuestionStart(Date.now());
      if (inputRef.current) inputRef.current.focus();
    }
  }, [operation, step]);

  // Génère une nouvelle question
  const generateQuestion = () => {
    const randomTableIndex = Math.floor(Math.random() * selectedTables.length);
    const table = selectedTables[randomTableIndex];
    const number = Math.floor(Math.random() * 10) + 1;
    setOperation(`${table} × ${number}`);
    setCorrectAnswer(table * number);
  };

  // Handler pour démarrer le quiz
  const handleStartQuiz = () => {
    setQuizResults([]);
    setCurrentQuestion(0);
    setPoints(0);
    setTotalTime(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setShowResult(null);
    setStep('quiz');
    setIsLoading(false);
    generateQuestion();
  };

  // Handler pour répondre à une question
  const handleAnswer = (userAnswer: number, timeSpent: number) => {
    const isCorrect = userAnswer === correctAnswer;
    let questionPoints = 0;
    if (isCorrect) {
      questionPoints += SCORING_SYSTEM.CORRECT_ANSWER;
      if (timeSpent < 3) {
        questionPoints += SCORING_SYSTEM.SPEED_BONUS.UNDER_3_SEC;
      } else if (timeSpent < 5) {
        questionPoints += SCORING_SYSTEM.SPEED_BONUS.UNDER_5_SEC;
      } else if (timeSpent < 8) {
        questionPoints += SCORING_SYSTEM.SPEED_BONUS.UNDER_8_SEC;
      }
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setMaxStreak(prev => Math.max(prev, newStreak));
      setPoints(prev => prev + questionPoints);
    } else {
      setCurrentStreak(0);
    }
    setQuizResults(prev => [...prev, {
      operation,
      userAnswer,
      correctAnswer,
      isCorrect,
      timeSpent,
      points: questionPoints
    }]);
    setTotalTime(prev => prev + timeSpent);
    setShowResult(isCorrect ? "correct" : "incorrect");
    setTimeout(() => {
      setShowResult(null);
      if (currentQuestion < TOTAL_QUESTIONS - 1) {
        setCurrentQuestion(prev => prev + 1);
        generateQuestion();
      } else {
        setStep('results');
        // Calcul du score final et sauvegarde
        let totalScore = points + questionPoints;
        let streakBonus = 0;
        if (maxStreak >= 10) streakBonus = SCORING_SYSTEM.STREAK_BONUS.STREAK_10;
        else if (maxStreak >= 7) streakBonus = SCORING_SYSTEM.STREAK_BONUS.STREAK_7;
        else if (maxStreak >= 5) streakBonus = SCORING_SYSTEM.STREAK_BONUS.STREAK_5;
        else if (maxStreak >= 3) streakBonus = SCORING_SYSTEM.STREAK_BONUS.STREAK_3;
        totalScore += streakBonus;
        // Correction ici : gérer tableau ou nombre
        const userScores = user?.scores?.game1;
        let isNewHighScore = false;
        if (Array.isArray(userScores)) {
          isNewHighScore = userScores.length < 3 || totalScore > Math.min(...userScores);
        } else if (typeof userScores === 'number') {
          isNewHighScore = totalScore > userScores;
        } else {
          isNewHighScore = true;
        }
        if (user && isNewHighScore) {
          updateScore('game1', totalScore);
        }
        setAnimatedScore(totalScore);
      }
    }, 300);
  };

  // Handler pour recommencer
  const handleRestart = () => {
    setSelectedTables([]);
    setQuizResults([]);
    setCurrentQuestion(0);
    setPoints(0);
    setTotalTime(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setShowResult(null);
    setStep('select');
    setIsLoading(false);
  };

  // Affichage de la sélection des tables
  if (step === 'select') {
    // Récupérer les 3 meilleurs scores de l'utilisateur courant pour ce jeu
    const myTopScores = Array.isArray(user?.scores?.game1) ? user.scores.game1 : (typeof user?.scores?.game1 === 'number' ? [user.scores.game1] : []);
    return (
      <RequireAuth>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
          <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
            <HeaderJeu />
            <div className="mb-8 animate-fade-in">
              <div className="relative">
                <h1 className="text-4xl font-display font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Sélectionne les tables à réviser
                </h1>
                <div className="absolute -top-4 -right-4 animate-bounce">
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <p className="text-xl text-blue-600">
                Choisissez les tables de multiplication que vous voulez réviser !
              </p>
            </div>
            <div className="bg-white/80 rounded-3xl p-8 shadow-xl border-2 border-blue-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-600">
                  Tables sélectionnées : {selectedTables.length}
                </h2>
                <button
                  onClick={() => setSelectedTables([])}
                  className={cn(
                    "p-3 rounded-xl transition-all",
                    "bg-red-50 text-red-500 hover:bg-red-100",
                    "flex items-center gap-2 font-medium",
                    "transform hover:scale-105 active:scale-95"
                  )}
                >
                  <RefreshCw className="h-5 w-5" />
                  Réinitialiser
                </button>
              </div>
              <TableSelector
                selectedTables={selectedTables}
                onSelectTable={table => setSelectedTables(selectedTables.includes(table) ? selectedTables.filter(t => t !== table) : [...selectedTables, table])}
              />
            </div>
            <div className="mt-12 flex justify-center animate-scale-in">
              <button
                onClick={selectedTables.length > 0 ? handleStartQuiz : undefined}
                className={cn(
                  "py-5 px-8 rounded-2xl flex items-center gap-3 transition-all",
                  selectedTables.length > 0
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/30"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
                disabled={selectedTables.length === 0}
              >
                Commencer le quiz
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            <div className="flex justify-center mt-8 mb-4">
              <button
                onClick={() => setShowRankings(v => !v)}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-lg shadow-md transition-all hover:from-purple-600 hover:to-blue-600 hover:scale-105 active:scale-95"
              >
                {showRankings ? 'Masquer les classements' : 'Afficher les classements'}
              </button>
            </div>
            {showRankings && (
              <div className="flex flex-col md:flex-row gap-8 justify-center items-start mb-8 w-full">
                {/* Mes top 3 scores */}
                <div className="bg-white/80 rounded-3xl p-6 shadow-lg border-2 border-blue-200 max-w-xs mx-auto">
                  <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">Mes 3 meilleurs scores</h2>
                  <ol className="flex flex-col items-center gap-2">
                    {myTopScores.length === 0 && <li className="text-gray-500">Aucun score enregistré</li>}
                    {myTopScores.map((score, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-lg">
                        <span className={idx === 0 ? 'text-yellow-500 font-bold text-2xl' : idx === 1 ? 'text-gray-400 font-bold text-xl' : 'text-orange-700 font-bold text-lg'}>
                          {idx + 1}.
                        </span>
                        <span className="ml-2 text-blue-700 font-bold">{score}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                {/* Top 3 global */}
                <div className="bg-white/80 rounded-3xl p-6 shadow-lg border-2 border-purple-200 max-w-xs mx-auto">
                  <h2 className="text-xl font-bold mb-4 text-purple-700 text-center">Top 3 des meilleurs scores</h2>
                  <ol className="flex flex-col items-center gap-2">
                    {topScores.length === 0 && <li className="text-gray-500">Aucun score global trouvé (il faut jouer au moins une partie)</li>}
                    {topScores.map((entry, idx) => (
                      <li key={entry.pseudo + '-' + entry.score} className="flex items-center gap-4 text-lg">
                        <span className={idx === 0 ? 'text-yellow-500 font-bold text-2xl' : idx === 1 ? 'text-gray-400 font-bold text-xl' : 'text-orange-700 font-bold text-lg'}>
                          {idx + 1}.
                        </span>
                        <span className="font-semibold">{entry.pseudo}</span>
                        <span className="ml-2 text-blue-700 font-bold">{entry.score}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </main>
        </div>
      </RequireAuth>
    );
  }

  // Affichage du quiz
  if (step === 'quiz') {
    const progress = ((currentQuestion + 1) / TOTAL_QUESTIONS) * 100;
    const handleValidate = () => {
      if (userInput.trim() === '') return;
      const timeSpent = (Date.now() - questionStart) / 1000;
      handleAnswer(Number(userInput), timeSpent);
    };

    return (
      <RequireAuth>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
          <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
            <HeaderJeu />
            <div className="relative">
              {showResult && (
                <div className={`absolute inset-0 flex items-center justify-center bg-${showResult === "correct" ? "green" : "red"}-500/20 backdrop-blur-sm rounded-lg z-10`}>
                  <div className={`text-6xl font-bold text-${showResult === "correct" ? "green" : "red"}-500`}>
                    {showResult === "correct" ? "Correct !" : "Incorrect !"}
                  </div>
                </div>
              )}
              <div className="bg-white/80 rounded-3xl p-8 shadow-xl border-2 border-blue-200">
                <div className="mb-8 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-blue-600 bg-white/80 px-6 py-3 rounded-2xl shadow-lg">
                      Question {currentQuestion + 1}/{TOTAL_QUESTIONS}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-xl bg-white/80 px-6 py-3 rounded-2xl shadow-lg">
                        <Trophy className="h-6 w-6 text-yellow-500" />
                        <span className="font-bold">{points}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xl bg-white/80 px-6 py-3 rounded-2xl shadow-lg">
                        <Clock className="h-6 w-6 text-blue-500" />
                        <span className="font-bold">{totalTime.toFixed(1)}s</span>
                      </div>
                      <div className="flex items-center gap-2 text-xl bg-white/80 px-6 py-3 rounded-2xl shadow-lg">
                        <Check className="h-6 w-6 text-green-500" />
                        <span className="font-bold">{quizResults.filter(r => r.isCorrect).length}</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={progress} className="h-4 bg-white/50 rounded-full overflow-hidden" />
                </div>
                <div className={cn(
                  "flex flex-col items-center gap-4 transition-all duration-500",
                  isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
                )}>
                  <p className="text-xl font-bold mb-2">{operation}</p>
                  <input
                    ref={inputRef}
                    type="number"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleValidate(); }}
                    className="w-32 text-center text-2xl px-4 py-2 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Votre réponse"
                    disabled={isLoading || showResult !== null}
                  />
                  <button
                    onClick={handleValidate}
                    className={cn(
                      "mt-2 px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg shadow-md transition-all",
                      userInput.trim() === '' || isLoading || showResult !== null
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:from-blue-600 hover:to-purple-600 hover:scale-105 active:scale-95"
                    )}
                    disabled={userInput.trim() === '' || isLoading || showResult !== null}
                  >
                    Valider
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </RequireAuth>
    );
  }

  // Affichage des résultats
  if (step === 'results') {
    // Récupérer les 3 meilleurs scores de l'utilisateur courant pour ce jeu
    const myTopScores = Array.isArray(user?.scores?.game1) ? user.scores.game1 : (typeof user?.scores?.game1 === 'number' ? [user.scores.game1] : []);
    return (
      <RequireAuth>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
          <HeaderJeu />
          <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row gap-8 justify-center items-start mb-8">
              {/* Mes top 3 scores */}
              <div className="flex-1 bg-white/80 rounded-3xl p-6 shadow-lg border-2 border-blue-200 max-w-xs mx-auto">
                <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">Mes 3 meilleurs scores</h2>
                <ol className="flex flex-col items-center gap-2">
                  {myTopScores.length === 0 && <li className="text-gray-500">Aucun score enregistré</li>}
                  {myTopScores.map((score, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-lg">
                      <span className={idx === 0 ? 'text-yellow-500 font-bold text-2xl' : idx === 1 ? 'text-gray-400 font-bold text-xl' : 'text-orange-700 font-bold text-lg'}>
                        {idx + 1}.
                      </span>
                      <span className="ml-2 text-blue-700 font-bold">{score}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* Top 3 global */}
              <div className="flex-1 bg-white/80 rounded-3xl p-6 shadow-lg border-2 border-purple-200 max-w-xs mx-auto">
                <h2 className="text-xl font-bold mb-4 text-purple-700 text-center">Top 3 des meilleurs scores</h2>
                <ol className="flex flex-col items-center gap-2">
                  {topScores.length === 0 && <li className="text-gray-500">Aucun score global trouvé (il faut jouer au moins une partie)</li>}
                  {topScores.map((entry, idx) => (
                    <li key={entry.pseudo} className="flex items-center gap-4 text-lg">
                      <span className={idx === 0 ? 'text-yellow-500 font-bold text-2xl' : idx === 1 ? 'text-gray-400 font-bold text-xl' : 'text-orange-700 font-bold text-lg'}>
                        {idx + 1}.
                      </span>
                      <span className="font-semibold">{entry.pseudo}</span>
                      <span className="ml-2 text-blue-700 font-bold">{entry.score}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-lg mb-6 text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {animatedScore.toLocaleString()}
              </div>
              <div className="text-lg text-muted-foreground mb-4">points</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleRestart} className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Nouveau Quiz
              </Button>
              <Button onClick={handleRestart} variant="outline" className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Retour à l'accueil
              </Button>
            </div>
          </main>
        </div>
      </RequireAuth>
    );
  }

  return null;
};

export default Game1;
