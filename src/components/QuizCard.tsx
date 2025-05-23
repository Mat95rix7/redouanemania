import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface QuizCardProps {
  operation: string;
  correctAnswer: number;
  onAnswer: (userAnswer: number, timeSpent: number) => void;
  isActive: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ operation, correctAnswer, onAnswer, isActive }) => {
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Nettoyer le timer lors du démontage du composant
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Focus l'input quand le composant devient actif ou quand l'opération change
  useEffect(() => {
    if (isActive && inputRef.current) {
      const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
      
      return () => clearTimeout(focusTimer);
    }
  }, [isActive, operation]);

  // Réinitialiser l'état quand l'opération change
  useEffect(() => {
    if (!isActive) return;

    setUserAnswer('');
    setStatus('idle');
    setTimeSpent(0);
    startTimeRef.current = Date.now();

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeSpent((Date.now() - startTimeRef.current) / 1000);
    }, 100);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [operation, isActive]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isActive || status !== 'idle' || !userAnswer.trim()) {
      return;
    }

    const parsedAnswer = parseInt(userAnswer);
    if (isNaN(parsedAnswer)) {
      return;
    }

    const isCorrect = parsedAnswer === correctAnswer;
    const finalTimeSpent = (Date.now() - startTimeRef.current) / 1000;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setStatus(isCorrect ? 'correct' : 'incorrect');
    setTimeSpent(finalTimeSpent);
    
    setTimeout(() => {
      onAnswer(parsedAnswer, finalTimeSpent);
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userAnswer.trim() && isActive && status === 'idle') {
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setUserAnswer(value);
  };

  return (
    <div
      className={cn(
        "p-8 rounded-3xl w-full max-w-md transition-all duration-500 transform",
        "border-4 shadow-xl glass-panel",
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-50",
        status === 'correct' ? "border-green-400 bg-green-50" :
        status === 'incorrect' ? "border-red-400 bg-red-50" :
        "border-blue-400 bg-blue-50"
      )}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-bold text-blue-600 bg-white/80 px-4 py-2 rounded-xl shadow-sm">
          ⏱️ {timeSpent.toFixed(1)}s
        </div>
        <div
          className={cn(
            "h-4 w-4 rounded-full transition-all duration-300",
            status === 'idle' ? "bg-blue-400 animate-pulse-subtle" :
            status === 'correct' ? "bg-green-400" :
            "bg-red-400"
          )}
        />
      </div>

      <div className="relative">
        <div className="text-4xl font-display font-bold text-center py-8 bg-white/80 rounded-2xl shadow-sm">
          {operation} = ?
        </div>
        {status === 'correct' && (
          <div className="absolute -top-4 -right-4 animate-bounce">
            <Sparkles className="h-8 w-8 text-yellow-400" />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex flex-col gap-4">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={userAnswer}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Ta réponse ici !"
            disabled={!isActive || status !== 'idle'}
            autoFocus
            className={cn(
              "w-full p-5 text-2xl text-center rounded-2xl transition-all",
              "border-2 bg-white/80 backdrop-blur-sm",
              "focus:ring-4 focus:ring-primary/50 focus:outline-none",
              "hover:scale-[1.02] active:scale-[0.98]",
              (!isActive || status !== 'idle') && "opacity-50 cursor-not-allowed"
            )}
          />

          <button
            type="submit"
            disabled={!isActive || !userAnswer.trim() || status !== 'idle'}
            className={cn(
              "w-full p-5 rounded-2xl transition-all font-bold text-xl",
              "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
              "hover:from-blue-600 hover:to-purple-600",
              "transform hover:scale-[1.02] active:scale-[0.98]",
              "shadow-lg focus:ring-4 focus:ring-primary/50 focus:outline-none",
              (!isActive || !userAnswer.trim() || status !== 'idle') && "opacity-50 cursor-not-allowed"
            )}
          >
            {status === 'idle' ? '🎯 Valider' : 
             status === 'correct' ? '✨ Bravo !' : 
             '❌ Essaie encore !'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizCard;
