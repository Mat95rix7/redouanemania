import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext.tsx';
import Header from '../components/Header';
import ScoreTable from '../components/ScoreTable';
import { CheckCircle, Clock, RefreshCw, ChevronLeft, Star } from 'lucide-react';
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
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const hasAddedScore = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentGameResults.length === 0) {
      navigate('/game1/select-tables');
      return;
    }

    // Calculate score, points and time
    const correctAnswers = currentGameResults.filter(result => result.isCorrect).length;
    const points = currentGameResults.reduce((total, result) => total + (result.points || 0), 0);
    const time = currentGameResults.reduce((total, result) => total + result.timeSpent, 0);
    
    setScore(correctAnswers);
    setTotalPoints(points);
    setTotalTime(time);
    
    // Add to high scores only once
    if (!hasAddedScore.current) {
      addHighScore(correctAnswers, time, points);
      hasAddedScore.current = true;
    }
    
    // Animation delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [currentGameResults, navigate, addHighScore]);

  const handlePlayAgain = () => {
    hasAddedScore.current = false;
    resetGameResults();
    navigate('/game1/quiz');
  };

  const handleNewGame = () => {
    hasAddedScore.current = false;
    resetGameResults();
    navigate('/game1/select-tables');
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
            "max-w-2xl mx-auto transition-all duration-500",
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}
        >
          <div className="glass-panel rounded-2xl p-8 mb-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{getScoreMessage()}</h1>
              <p className="text-muted-foreground">
                Tables: {selectedTablesText}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-xl bg-white/50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Score</span>
                </div>
                <div className="text-2xl font-bold">{score}/10</div>
              </div>

              <div className="text-center p-4 rounded-xl bg-white/50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">Points</span>
                </div>
                <div className="text-2xl font-bold">{totalPoints}</div>
              </div>

              <div className="text-center p-4 rounded-xl bg-white/50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Temps</span>
                </div>
                <div className="text-2xl font-bold">{totalTime.toFixed(1)}s</div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handlePlayAgain}
                className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-medium 
                         hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Rejouer
              </button>
              
              <button
                onClick={handleNewGame}
                className="flex-1 py-3 px-4 rounded-xl border border-primary text-primary 
                         font-medium hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Nouvelle partie
              </button>
            </div>
          </div>

          <ScoreTable />
        </div>
      </main>
    </div>
  );
};

export default Results;
