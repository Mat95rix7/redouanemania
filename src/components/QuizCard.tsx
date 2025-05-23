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
      // Petit délai pour s'assurer que le DOM est prêt et que les animations sont terminées
      const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
        // Sélectionner tout le texte pour faciliter la nouvelle saisie
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

    // Nettoyer l'ancien timer s'il existe
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Créer un nouveau timer
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
    
    // Vérifications de sécurité
    if (!isActive || status !== 'idle' || !userAnswer.trim()) {
      return;
    }

    const parsedAnswer = parseInt(userAnswer);
    if (isNaN(parsedAnswer)) {
      return;
    }

    const isCorrect = parsedAnswer === correctAnswer;
    const finalTimeSpent = (Date.now() - startTimeRef.current) / 1000;

    // Nettoyer le timer avant de changer l'état
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setStatus(isCorrect ? 'correct' : 'incorrect');
    setTimeSpent(finalTimeSpent);
    
    // Petit délai pour permettre l'animation avant d'appeler onAnswer
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
    // N'autoriser que les chiffres
    const value = e.target.value.replace(/[^0-9]/g, '');
    setUserAnswer(value);
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
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={userAnswer}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Votre réponse"
            disabled={!isActive || status !== 'idle'}
            autoFocus
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
