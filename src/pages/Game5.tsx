import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Calculator, Trophy, Clock } from 'lucide-react';
import { useGameContext } from '../context/GameContext.tsx';
import { cn } from '@/lib/utils';

const Game5 = () => {
  const navigate = useNavigate();
  const { username } = useGameContext();
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [grid, setGrid] = useState<number[][]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [availableCorrectAnswers, setAvailableCorrectAnswers] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  useEffect(() => {
    if (startTime && !isGameOver) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    }
  }, [startTime, isGameOver]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const generateGrid = (table: number) => {
    const rows = 5;
    const cols = 6;
    const grid: number[][] = [];
    const maxNumber = table * 10;
    
    // Generate all possible correct answers for this table
    const correctAnswers = Array.from({ length: 10 }, (_, i) => table * (i + 1));
    
    // Always include all 10 correct answers
    const selectedCorrectAnswers = new Set(correctAnswers);
    
    // Generate other random numbers for the grid
    const allNumbers = new Set<number>(selectedCorrectAnswers);
    const maxAttempts = 100; // Prevent infinite loops
    let attempts = 0;
    
    if (table === 2) {
      // For table 2, allow both even and odd numbers, and allow similar numbers
      while (allNumbers.size < rows * cols) {
        // 70% chance of even number, 30% chance of odd number
        const isEven = Math.random() < 0.7;
        let randomNum;
        if (isEven) {
          randomNum = (Math.floor(Math.random() * 10) + 1) * 2;
        } else {
          randomNum = Math.floor(Math.random() * 20) + 1;
        }
        allNumbers.add(randomNum);
      }
    } else {
      // For other tables, ensure unique numbers
      while (allNumbers.size < rows * cols && attempts < maxAttempts) {
        attempts++;
        const randomNum = Math.floor(Math.random() * maxNumber) + 1;
        if (!allNumbers.has(randomNum)) {
          allNumbers.add(randomNum);
        }
      }
      
      // If we still don't have enough numbers, fill with some safe numbers
      while (allNumbers.size < rows * cols) {
        const safeNumber = Math.floor(Math.random() * maxNumber) + 1;
        allNumbers.add(safeNumber);
      }
    }

    // Convert to array and shuffle
    const numbers = Array.from(allNumbers);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Create grid
    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        row.push(numbers[i * cols + j]);
      }
      grid.push(row);
    }

    setAvailableCorrectAnswers(Array.from(selectedCorrectAnswers));
    return grid;
  };

  const handleTableSelect = (table: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedTable(table);
      setGrid(generateGrid(table));
      setIsAnimating(false);
      setCorrectCount(0);
      setMessage(null);
      setSelectedNumbers([]);
      setStartTime(Date.now());
      setElapsedTime(0);
      setWrongAnswers(0);
    }, 300);
  };

  const handleNumberClick = (number: number) => {
    if (isGameOver) return;

    setSelectedNumbers(prev => {
      // Si le nombre est déjà sélectionné, on le désélectionne
      if (prev.includes(number)) {
        const newSelected = prev.filter(n => n !== number);
        const correctNumbers = newSelected.filter(n => availableCorrectAnswers.includes(n));
        setCorrectCount(correctNumbers.length);
        setMessage(null);
        return newSelected;
      }
      
      // Si c'est une nouvelle sélection
      if (availableCorrectAnswers.includes(number)) {
        // Bonne réponse
        const newSelected = [...prev, number];
        const correctNumbers = newSelected.filter(n => availableCorrectAnswers.includes(n));
        setCorrectCount(correctNumbers.length);
        
        // Vérifier si tous les résultats sont trouvés
        const allCorrect = availableCorrectAnswers.every(n => newSelected.includes(n));
        if (allCorrect) {
          if (timerInterval) {
            clearInterval(timerInterval);
          }
          setIsGameOver(true);
          setMessage("Félicitations ! Vous avez trouvé tous les résultats !");
        } else {
          setMessage(`Correct ! ${correctNumbers.length}/${availableCorrectAnswers.length} résultats trouvés.`);
        }
        return newSelected;
      } else {
        // Mauvaise réponse
        setWrongAnswers(prev => prev + 1);
        setMessage("Ce nombre n'est pas un résultat de la table. Essayez encore !");
        // On ne garde pas la sélection pour les mauvaises réponses
        return prev;
      }
    });
  };

  const handleReset = () => {
    setIsAnimating(true);
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    setTimeout(() => {
      setGrid(generateGrid(selectedTable!));
      setSelectedNumbers([]);
      setIsGameOver(false);
      setCorrectCount(0);
      setMessage(null);
      setStartTime(Date.now());
      setElapsedTime(0);
      setWrongAnswers(0);
      setIsAnimating(false);
    }, 300);
  };

  const handleBackToSelection = () => {
    setIsAnimating(true);
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    setTimeout(() => {
      setSelectedTable(null);
      setGrid([]);
      setSelectedNumbers([]);
      setIsGameOver(false);
      setCorrectCount(0);
      setMessage(null);
      setAvailableCorrectAnswers([]);
      setStartTime(null);
      setElapsedTime(0);
      setWrongAnswers(0);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBackToSelection}
          className="absolute top-2 sm:top-4 left-2 sm:left-4 flex items-center gap-1 sm:gap-2 text-blue-600 hover:text-blue-700 transition-all bg-white/80 px-2 sm:px-4 py-1 sm:py-2 rounded-xl shadow-sm hover:scale-105 active:scale-95 text-xs sm:text-base hover:shadow-md"
        >
          <ArrowLeft className="w-3 h-3 sm:w-5 sm:h-5" />
          Retour
        </button>

        <div className="mb-4 sm:mb-8 animate-fade-in">
          <div className="relative">
            <h1 className="text-2xl sm:text-4xl font-display font-bold my-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Table de Multiplication
            </h1>
            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 animate-bounce">
              <Sparkles className="h-4 w-4 sm:h-8 sm:w-8 text-yellow-400" />
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-4 text-sm sm:text-xl text-blue-600">
            <Calculator className="h-4 w-4 sm:h-6 sm:w-6" />
            <p className="text-sm sm:text-base">Choisissez une table de multiplication et trouvez tous les résultats dans la grille !</p>
          </div>
        </div>

        <div className={cn(
          "transition-all duration-300 relative",
          isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}>
          {!selectedTable ? (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-3xl p-3 sm:p-8 shadow-xl border-2 border-blue-200 transform hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-1 sm:gap-3 mb-3 sm:mb-6">
                <Calculator className="h-5 w-5 sm:h-8 sm:w-8 text-blue-500" />
                <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Choisissez une table
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {Array.from({ length: 8 }, (_, i) => i + 3).map((table) => (
                  <button
                    key={table}
                    onClick={() => handleTableSelect(table)}
                    className="p-2 sm:p-4 bg-white rounded-lg sm:rounded-xl text-center shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] border-2 border-blue-100 hover:border-blue-300"
                  >
                    <span className="text-sm sm:text-lg font-medium text-blue-600">Table de {table}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-3xl p-3 sm:p-8 shadow-xl border-2 border-purple-200 transform hover:scale-[1.02] transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
                <div className="flex items-center gap-1 sm:gap-3">
                  <Trophy className="h-5 w-5 sm:h-8 sm:w-8 text-yellow-500" />
                  <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Table de {selectedTable}
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1 sm:gap-2 text-blue-600 bg-white/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border-2 border-blue-200">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-lg font-medium">{formatTime(elapsedTime)}</span>
                  </div>
                  <div className="text-sm sm:text-lg font-medium text-blue-600 bg-white/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border-2 border-blue-200">
                    Trouvés : {correctCount}/{availableCorrectAnswers.length}
                  </div>
                  {isGameOver && (
                    <button
                      onClick={handleReset}
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md text-sm sm:text-base"
                    >
                      Recommencer
                    </button>
                  )}
                </div>
              </div>

              {message && (
                <div className={cn(
                  "mb-4 sm:mb-6 p-2 sm:p-4 rounded-lg sm:rounded-xl text-sm sm:text-lg font-medium animate-fade-in",
                  message.includes("Félicitations") 
                    ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-2 border-green-300"
                    : message.includes("Correct")
                    ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-2 border-blue-300"
                    : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-2 border-red-300"
                )}>
                  {message}
                </div>
              )}

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-3">
                {grid.map((row, i) =>
                  row.map((number, j) => (
                    <button
                      key={`${i}-${j}`}
                      onClick={() => handleNumberClick(number)}
                      className={cn(
                        "p-2 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 text-base sm:text-2xl font-bold transform hover:scale-105 active:scale-95",
                        selectedNumbers.includes(number)
                          ? isGameOver
                            ? availableCorrectAnswers.includes(number)
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-2 border-green-300 shadow-sm"
                              : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-2 border-red-300 shadow-sm"
                            : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-2 border-blue-300 shadow-sm"
                          : "bg-white hover:bg-gray-50 border-2 border-gray-200 shadow-sm hover:shadow-md"
                      )}
                    >
                      {number}
                    </button>
                  ))
                )}
              </div>

              {isGameOver && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl border-2 border-green-200 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-green-700">Résultats trouvés dans la grille</h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <div className="text-sm sm:text-lg text-green-700 bg-white/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border-2 border-green-200">
                        Temps : {formatTime(elapsedTime)}
                      </div>
                      <div className="text-sm sm:text-lg text-green-700 bg-white/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border-2 border-green-200">
                        Erreurs : {wrongAnswers}
                      </div>
                      <div className="text-sm sm:text-lg text-green-700 bg-white/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border-2 border-green-200">
                        Difficulté : {availableCorrectAnswers.length} résultats
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 sm:gap-2">
                    {availableCorrectAnswers.map((result) => (
                      <div key={result} className="p-1 sm:p-2 bg-white rounded-lg text-center shadow-sm border-2 border-green-100">
                        <span className="text-xs sm:text-sm text-gray-500">{selectedTable} × {result / selectedTable} =</span>
                        <span className="block text-sm sm:text-lg font-bold text-green-600">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game5; 