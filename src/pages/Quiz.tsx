
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import Header from '../components/Header';
import QuizCard from '../components/QuizCard';
import { Progress } from '@/components/ui/progress';
import { Clock, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const TOTAL_QUESTIONS = 10;

const Quiz = () => {
  const { selectedTables, addGameResult, resetGameResults } = useGameContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [operation, setOperation] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Generate a random multiplication question
  const generateQuestion = useCallback(() => {
    const randomTableIndex = Math.floor(Math.random() * selectedTables.length);
    const table = selectedTables[randomTableIndex];
    const number = Math.floor(Math.random() * 10) + 1;
    const op = `${table} × ${number}`;
    setOperation(op);
    setCorrectAnswer(table * number);
  }, [selectedTables]);

  useEffect(() => {
    if (selectedTables.length === 0) {
      navigate('/select-tables');
      return;
    }
    
    // Fix the infinite loop - only reset on initial mount
    const initialSetup = () => {
      resetGameResults();
      setCorrectCount(0);
      setTotalTime(0);
      setCurrentQuestion(0);
      generateQuestion();
    };
    
    initialSetup();
    
    // Initial animation delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [navigate, selectedTables, resetGameResults, generateQuestion]);

  const handleAnswer = (userAnswer: number, timeSpent: number) => {
    const isCorrect = userAnswer === correctAnswer;
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      toast('Bonne réponse !', { description: `${operation} = ${correctAnswer}` });
    } else {
      toast('Mauvaise réponse', { 
        description: `La réponse était ${correctAnswer}`,
        style: { backgroundColor: 'rgb(239, 68, 68)', color: 'white' } 
      });
    }
    
    // Record the result
    addGameResult({
      operation,
      userAnswer,
      correctAnswer,
      timeSpent,
      isCorrect
    });
    
    setTotalTime(prev => prev + timeSpent);
    
    // Show feedback before moving to next question
    setTimeout(() => {
      if (currentQuestion < TOTAL_QUESTIONS - 1) {
        setCurrentQuestion(prev => prev + 1);
        generateQuestion();
      } else {
        // Quiz completed
        navigate('/results');
      }
    }, 1000);
  };

  const progress = ((currentQuestion + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1}/{TOTAL_QUESTIONS}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{totalTime.toFixed(1)}s</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span>{correctCount}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <X className="h-4 w-4 text-red-500" />
                <span>{currentQuestion - correctCount}</span>
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
