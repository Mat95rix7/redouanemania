
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext.tsx';
import Header from '../components/Header';
import ScoreTable from '../components/ScoreTable';
import { CheckCircle, Clock, RefreshCw, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const Results = () => {
  const { 
    username, 
    currentGameResults, 
    highScores, 
    addHighScore, 
    selectedTables,
    resetGameResults 
  } = useGameContext();
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentGameResults.length === 0) {
      navigate('/select-tables');
      return;
    }

    // Calculate score and time
    const correctAnswers = currentGameResults.filter(result => result.isCorrect).length;
    const time = currentGameResults.reduce((total, result) => total + result.timeSpent, 0);
    
    setScore(correctAnswers);
    setTotalTime(time);
    
    // Add to high scores
    addHighScore(correctAnswers, time);
    
    // Animation delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [currentGameResults, navigate, addHighScore]);

  const handlePlayAgain = () => {
    resetGameResults();
    navigate('/quiz');
  };

  const handleNewGame = () => {
    resetGameResults();
    navigate('/select-tables');
  };

  const getScoreMessage = () => {
    if (score === 10) return "Parfait !";
    if (score >= 8) return "Excellent !";
    if (score >= 6) return "Bien joué !";
    if (score >= 4) return "Pas mal !";
    return "Continuez à vous entraîner !";
  };

  const selectedTablesText = selectedTables
    .sort((a, b) => a - b)
    .join(', ');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
        <div 
          className={cn(
            "mb-12 text-center transition-all duration-500 transform",
            isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}
        >
          <h1 className="text-3xl font-display font-bold mb-2">
            {getScoreMessage()}
          </h1>
          <p className="text-muted-foreground mb-6">
            Tables utilisées : {selectedTablesText}
          </p>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2 text-lg font-medium text-foreground">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Score
              </div>
              <div className="text-3xl font-display font-semibold">
                {score}/10
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2 text-lg font-medium text-foreground">
                <Clock className="h-5 w-5 text-blue-500" />
                Temps total
              </div>
              <div className="text-3xl font-display font-semibold">
                {totalTime.toFixed(1)}s
              </div>
            </div>
          </div>
        </div>
        
        <div 
          className={cn(
            "mb-12 transition-all duration-500 delay-100",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        >
          <ScoreTable scores={highScores} currentUserName={username} />
        </div>
        
        <div 
          className={cn(
            "flex flex-col sm:flex-row justify-center gap-4 mt-8 transition-all duration-500 delay-200",
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}
        >
          <button
            onClick={handlePlayAgain}
            className="px-6 py-3 rounded-xl flex items-center justify-center gap-2 
                       bg-primary text-white font-medium shadow-sm transition-all hover-scale
                       focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <RefreshCw className="h-4 w-4" />
            Rejouer
          </button>
          <button
            onClick={handleNewGame}
            className="px-6 py-3 rounded-xl flex items-center justify-center gap-2
                       bg-white border border-border/50 shadow-sm transition-all hover-scale
                       focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <ChevronLeft className="h-4 w-4" />
            Changer de tables
          </button>
        </div>
      </main>
    </div>
  );
};

export default Results;
