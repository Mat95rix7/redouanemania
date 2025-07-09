import React, { useRef, useEffect } from 'react';
import { Progress } from './ui/progress';
import { Trophy, Clock, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizSectionProps {
  operation: string;
  userInput: string;
  onInputChange: (v: string) => void;
  onInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onValidate: () => void;
  isLoading: boolean;
  showResult: 'correct' | 'incorrect' | null;
  progress: number;
  points: number;
  totalTime: number;
  correctCount: number;
  inputRef: React.RefObject<HTMLInputElement>;
}

const QuizSection: React.FC<QuizSectionProps> = ({
  operation,
  userInput,
  onInputChange,
  onInputKeyDown,
  onValidate,
  isLoading,
  showResult,
  progress,
  points,
  totalTime,
  correctCount,
  inputRef,
}) => (
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
            {operation}
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
              <span className="font-bold">{correctCount}</span>
            </div>
          </div>
        </div>
        <Progress value={progress} className="h-4 bg-white/50 rounded-full overflow-hidden" />
      </div>
      <div className={cn(
        "flex flex-col items-center gap-4 transition-all duration-500",
        isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
      )}>
        <input
          ref={inputRef}
          type="number"
          value={userInput}
          onChange={e => onInputChange(e.target.value)}
          onKeyDown={onInputKeyDown}
          className="w-32 text-center text-2xl px-4 py-2 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Votre réponse"
          disabled={isLoading || showResult !== null}
        />
        <button
          onClick={onValidate}
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
);

export default QuizSection; 