import React, { useState, useRef, useEffect } from 'react';
import RequireAuth from '../components/RequireAuth';
import TableSelectorSection from '../components/TableSelectorSection';
import QuizSection from '../components/QuizSection';
import RankingsSection from '../components/RankingsSection';
import ResultsSection from '../components/ResultsSection';
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
        setTopScores(allScores.slice(0, 5));
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

  // Handler pour le retour à l'accueil
  const handleHome = () => {
    window.location.href = '/';
  };

  // Récupérer les 3 meilleurs scores de l'utilisateur courant pour ce jeu
  const myTopScores = Array.isArray(user?.scores?.game1)
    ? user.scores.game1.map((score: number) => ({ score }))
    : typeof user?.scores?.game1 === 'number'
    ? [{ score: user.scores.game1 }]
    : [];

  if (step === 'select') {
    return (
      <RequireAuth>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
          <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
            <HeaderJeu />
            <TableSelectorSection
              selectedTables={selectedTables}
              onSelectTable={table => setSelectedTables(selectedTables.includes(table) ? selectedTables.filter(t => t !== table) : [...selectedTables, table])}
              onReset={() => setSelectedTables([])}
              onStartQuiz={handleStartQuiz}
              isStartDisabled={selectedTables.length === 0}
            />
          </main>
          <div className="w-full bg-transparent flex justify-center">
            <div className="container max-w-4xl mx-auto px-6 pb-8">
              <RankingsSection
                show={showRankings}
                onToggle={() => setShowRankings(v => !v)}
                myTopScores={myTopScores}
                topScores={topScores}
              />
            </div>
          </div>
        </div>
      </RequireAuth>
    );
  }

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
            <QuizSection
              operation={operation}
              userInput={userInput}
              onInputChange={setUserInput}
              onInputKeyDown={e => { if (e.key === 'Enter') handleValidate(); }}
              onValidate={handleValidate}
              isLoading={isLoading}
              showResult={showResult}
              progress={progress}
              points={points}
              totalTime={totalTime}
              correctCount={quizResults.filter(r => r.isCorrect).length}
              inputRef={inputRef}
            />
          </main>
        </div>
      </RequireAuth>
    );
  }

  if (step === 'results') {
    return (
      <RequireAuth>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
          <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
            <HeaderJeu />
            <ResultsSection
              animatedScore={animatedScore}
              myTopScores={myTopScores}
              topScores={topScores}
              onRestart={handleRestart}
              onHome={handleHome}
            />
          </main>
        </div>
      </RequireAuth>
    );
  }

  return null;
};

export default Game1;
