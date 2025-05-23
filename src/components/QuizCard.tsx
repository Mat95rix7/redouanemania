import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

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

  // Timer uniquement quand operation change (évite les boucles)
  useEffect(() => {
    if (!isActive) return;

    setUserAnswer('');
    setStatus('idle');
    startTimeRef.current = Date.now();
    if (inputRef.current) inputRef.current.focus();

    const timer = setInterval(() => {
      setTimeSpent((Date.now() - startTimeRef.current) / 1000);
    }, 100);

    return () => clearInterval(timer);
  }, [operation]); // ← on observe uniquement l'opération

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || !isActive || status !== 'idle') return;

    const parsedAnswer = parseInt(userAnswer);
    const isCorrect = parsedAnswer === correctAnswer;
    const finalTimeSpent = (Date.now() - startTimeRef.current) / 1000;

    setStatus(isCorrect ? 'correct' : 'incorrect');
    setTimeSpent(finalTimeSpent);
    onAnswer(parsedAnswer, finalTimeSpent);
  };

  return (
    <div
      className={cn(
        "p-6 rounded-2xl w-full max-w-md transition-all duration-300 transform",
        "border shadow-sm glass-panel",
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-50",
        status === 'correct' ? "border-green-400" :
        status === 'incorrect' ? "border-red-400" : ""
      )}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium text-muted-foreground">
          Temps: {timeSpent.toFixed(1)}s
        </div>
        <div
          className={cn(
            "h-3 w-3 rounded-full",
            status === 'idle' ? "bg-blue-400 animate-pulse-subtle" :
            status === 'correct' ? "bg-green-400" :
            "bg-red-400"
          )}
        />
      </div>

      <div className="text-3xl font-display font-semibold text-center py-8">
        {operation} = ?
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col gap-4">
          <input
            ref={inputRef}
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Votre réponse"
            disabled={!isActive || status !== 'idle'}
            className={cn(
              "w-full p-4 text-xl text-center rounded-xl transition-all",
              "border bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/50 focus:outline-none",
              (!isActive || status !== 'idle') && "opacity-50 cursor-not-allowed"
            )}
          />

          <button
            type="submit"
            disabled={!isActive || !userAnswer.trim() || status !== 'idle'}
            className={cn(
              "w-full p-4 rounded-xl transition-all font-medium",
              "bg-primary text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 focus:outline-none",
              (!isActive || !userAnswer.trim() || status !== 'idle') && "opacity-50 cursor-not-allowed"
            )}
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizCard;
