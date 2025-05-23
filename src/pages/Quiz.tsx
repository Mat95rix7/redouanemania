import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext.tsx';
import Header from '../components/Header';
import QuizCard from '../components/QuizCard';
import { Progress } from '@/components/ui/progress';
import { Clock, Check, X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const TOTAL_QUESTIONS = 10;
const BASE_POINTS = 10;
const MAX_TIME_BONUS = 5; // Points bonus maximum pour la rapidité
const TIME_THRESHOLD = 5; // Seuil de temps en secondes pour le bonus maximum

// Fonction pour calculer la complexité d'une opération
const calculateComplexity = (num1: number, num2: number): number => {
  // Plus les nombres sont grands, plus c'est complexe
  const maxNumber = Math.max(num1, num2);
  const minNumber = Math.min(num1, num2);
  
  // Base de complexité
  let complexity = 1;
  
  // Multiplicateur pour les grands nombres
  if (maxNumber > 5) complexity += 0.5;
  if (maxNumber > 7) complexity += 0.5;
  
  // Bonus pour les nombres pairs
  if (num1 % 2 === 0 && num2 % 2 === 0) complexity += 0.5;
  
  // Bonus pour les nombres impairs
  if (num1 % 2 === 1 && num2 % 2 === 1) complexity += 0.5;
  
  // Bonus pour les nombres identiques
  if (num1 === num2) complexity += 0.5;
  
  return complexity;
};

// Fonction pour calculer les points bonus de rapidité
const calculateTimeBonus = (timeSpent: number): number => {
  if (timeSpent <= 1) return MAX_TIME_BONUS;
  if (timeSpent >= TIME_THRESHOLD) return 0;
  
  // Calcul linéaire du bonus entre 1 et TIME_THRESHOLD secondes
  return MAX_TIME_BONUS * (1 - (timeSpent - 1) / (TIME_THRESHOLD - 1));
};

const Quiz = () => {
  const { selectedTables, addGameResult, resetGameResults } = useGameContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [operation, setOperation] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();

  // Generate a random multiplication question
  const generateQuestion = useCallback(() => {
    if (selectedTables.length === 0) return;
    
    const randomTableIndex = Math.floor(Math.random() * selectedTables.length);
    const table = selectedTables[randomTableIndex];
    const number = Math.floor(Math.random() * 10) + 1;
    const op = `${table} × ${number}`;
    setOperation(op);
    setCorrectAnswer(table * number);
  }, [selectedTables]);

  // Initialize the quiz
  useEffect(() => {
    if (selectedTables.length === 0) {
      navigate('/game1/select-tables');
      return;
    }

    resetGameResults();
    setCorrectCount(0);
    setTotalTime(0);
    setCurrentQuestion(0);
    generateQuestion();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [navigate, selectedTables, resetGameResults, generateQuestion]);

  const handleAnswer = (userAnswer: number, timeSpent: number) => {
    const isCorrect = userAnswer === correctAnswer;
    let questionPoints = 0;
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      
      // Extraire les nombres de l'opération
      const [num1, num2] = operation.split('×').map(n => parseInt(n.trim()));
      
      // Calculer la complexité et les points de base
      const complexity = calculateComplexity(num1, num2);
      const basePoints = Math.round(BASE_POINTS * complexity);
      
      // Calculer le bonus de temps
      const timeBonus = Math.round(calculateTimeBonus(timeSpent));
      
      // Total des points pour cette question
      questionPoints = basePoints + timeBonus;
      
      setPoints(prev => prev + questionPoints);
    }
    
    // Record the result
    addGameResult({
      operation,
      userAnswer,
      correctAnswer,
      timeSpent,
      isCorrect,
      points: questionPoints
    });
    
    setTotalTime(prev => prev + timeSpent);
    
    // Passer à la question suivante immédiatement
    if (currentQuestion < TOTAL_QUESTIONS - 1) {
      setCurrentQuestion(prev => prev + 1);
      generateQuestion();
    } else {
      // Quiz completed
      navigate('/game1/results');
    }
  };

  const progress = ((currentQuestion + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-medium text-muted-foreground">
              Question {currentQuestion + 1}/{TOTAL_QUESTIONS}
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-lg bg-white/50 px-4 py-2 rounded-xl shadow-sm">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="font-medium">{totalTime.toFixed(1)}s</span>
              </div>
              <div className="flex items-center gap-2 text-lg bg-white/50 px-4 py-2 rounded-xl shadow-sm">
                <Check className="h-5 w-5 text-green-500" />
                <span className="font-medium">{correctCount}</span>
              </div>
              <div className="flex items-center gap-2 text-lg bg-white/50 px-4 py-2 rounded-xl shadow-sm">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">{points}</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2 bg-secondary" />
        </div>
        
        <div 
          className={cn(
            "flex justify-center transition-all duration-500",
            isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}
        >
          <QuizCard
            operation={operation}
            correctAnswer={correctAnswer}
            onAnswer={handleAnswer}
            isActive={!isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default Quiz;
