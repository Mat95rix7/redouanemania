'use client';
import React, { useState, useRef } from 'react';
import RequireAuth from '@/components/RequireAuth';
import TableSelectorSection from '@/components/TableSelectorSection';
import QuizSection from '@/components/QuizSection';
import GameRankings from '@/components/GameRankings';
import ResultsSection from '@/components/ResultsSection';
import { useGameScores } from '@/hooks/useGameScores';
import HeaderJeu from '@/components/HeaderJeu';

const TOTAL_QUESTIONS = 10;
const SCORING_SYSTEM = {
  CORRECT_ANSWER: 100,
  SPEED_BONUS: {
    UNDER_3_SEC: 50,
    UNDER_5_SEC: 30,
    UNDER_8_SEC: 10,
  },
  STREAK_BONUS: {
    STREAK_3: 25,
    STREAK_5: 50,
    STREAK_7: 75,
    STREAK_10: 100,
  },
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
  const { saveScore } = useGameScores('game1');

  const [step, setStep] = useState<'select' | 'quiz' | 'results'>('select');
  const [selectedTables, setSelectedTables] = useState<number[]>([]);
  const [quizResults, setQuizResults] = useState<GameResult[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [operation, setOperation] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
  const [points, setPoints] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [questionStart, setQuestionStart] = useState(() => Date.now());
  const inputRef = useRef<HTMLInputElement>(null);

  const generateQuestion = () => {
    const table = selectedTables[Math.floor(Math.random() * selectedTables.length)];
    const number = Math.floor(Math.random() * 10) + 1;
    setOperation(`${table} × ${number}`);
    setCorrectAnswer(table * number);
    setUserInput('');
    setQuestionStart(Date.now());
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleStartQuiz = () => {
    setQuizResults([]);
    setCurrentQuestion(0);
    setPoints(0);
    setTotalTime(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setShowResult(null);
    setIsLoading(false);
    setStep('quiz');
    generateQuestion();
  };

  const handleAnswer = (userAnswer: number, timeSpent: number) => {
    const isCorrect = userAnswer === correctAnswer;
    let questionPoints = 0;

    if (isCorrect) {
      questionPoints += SCORING_SYSTEM.CORRECT_ANSWER;
      if (timeSpent < 3) questionPoints += SCORING_SYSTEM.SPEED_BONUS.UNDER_3_SEC;
      else if (timeSpent < 5) questionPoints += SCORING_SYSTEM.SPEED_BONUS.UNDER_5_SEC;
      else if (timeSpent < 8) questionPoints += SCORING_SYSTEM.SPEED_BONUS.UNDER_8_SEC;

      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setMaxStreak(prev => Math.max(prev, newStreak));
      setPoints(prev => prev + questionPoints);
    } else {
      setCurrentStreak(0);
    }

    setQuizResults(prev => [
      ...prev,
      { operation, userAnswer, correctAnswer, isCorrect, timeSpent, points: questionPoints },
    ]);
    setTotalTime(prev => prev + timeSpent);
    setShowResult(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setShowResult(null);
      if (currentQuestion < TOTAL_QUESTIONS - 1) {
        setCurrentQuestion(prev => prev + 1);
        generateQuestion();
      } else {
        let totalScore = points + questionPoints;
        let streakBonus = 0;
        if (maxStreak >= 10) streakBonus = SCORING_SYSTEM.STREAK_BONUS.STREAK_10;
        else if (maxStreak >= 7) streakBonus = SCORING_SYSTEM.STREAK_BONUS.STREAK_7;
        else if (maxStreak >= 5) streakBonus = SCORING_SYSTEM.STREAK_BONUS.STREAK_5;
        else if (maxStreak >= 3) streakBonus = SCORING_SYSTEM.STREAK_BONUS.STREAK_3;
        totalScore += streakBonus;

        saveScore(totalScore);
        setAnimatedScore(totalScore);
        setStep('results');
      }
    }, 300);
  };

  const handleRestart = () => {
    setSelectedTables([]);
    setQuizResults([]);
    setCurrentQuestion(0);
    setPoints(0);
    setTotalTime(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setShowResult(null);
    setIsLoading(false);
    setStep('select');
  };

  if (step === 'select') {
    return (
      <RequireAuth>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
          <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
            <HeaderJeu />
            <TableSelectorSection
              selectedTables={selectedTables}
              onSelectTable={table =>
                setSelectedTables(prev =>
                  prev.includes(table) ? prev.filter(t => t !== table) : [...prev, table]
                )
              }
              onReset={() => setSelectedTables([])}
              onStartQuiz={handleStartQuiz}
              isStartDisabled={selectedTables.length === 0}
            />
          </main>
          <div className="w-full bg-transparent flex justify-center">
            <div className="container max-w-4xl mx-auto px-6 pb-8">
              <GameRankings gameKey="game1" />
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
      handleAnswer(Number(userInput), (Date.now() - questionStart) / 1000);
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
              gameKey="game1"
              onRestart={handleRestart}
              onHome={() => { window.location.href = '/'; }}
            />
          </main>
        </div>
      </RequireAuth>
    );
  }

  return null;
};

export default Game1;