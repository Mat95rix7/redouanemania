import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Multiplication {
  num1: number;
  num2: number;
  answer: number;
  userAnswer: string;
}

interface MultiplicationGridProps {
  multiplications: Multiplication[];
  isGameOver: boolean;
  onAnswerChange: (index: number, value: string) => void;
}

const MultiplicationGrid: React.FC<MultiplicationGridProps> = ({ multiplications, isGameOver, onAnswerChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
    {multiplications.map((m, index) => (
      <div
        key={index}
        className={cn(
          "min-h-[140px] w-full flex flex-col justify-center items-center gap-4 p-6 rounded-2xl transition-all duration-300 border-2 shadow-lg bg-white",
          isGameOver
            ? parseInt(m.userAnswer) === m.answer
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
            : "hover:border-blue-400 hover:shadow-xl"
        )}
      >
        <div className="text-2xl font-bold text-blue-700">
          {m.num1} × {m.num2} =
        </div>
        <div className="w-full flex justify-center">
          {!isGameOver ? (
            <input
              type="number"
              value={m.userAnswer}
              onChange={e => onAnswerChange(index, e.target.value)}
              className="w-20 text-center text-xl px-3 py-2 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              placeholder="?"
            />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <div className="text-xl font-bold">
                {parseInt(m.userAnswer) === m.answer ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-5 w-5" /> {m.answer}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-600">
                    <XCircle className="h-5 w-5" /> {m.answer}
                  </span>
                )}
              </div>
              {parseInt(m.userAnswer) !== m.answer && (
                <div className="text-sm text-red-500">Ta réponse: {m.userAnswer || 'Non répondu'}</div>
              )}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default MultiplicationGrid; 