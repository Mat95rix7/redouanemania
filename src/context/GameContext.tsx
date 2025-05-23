import React, { createContext, useContext, useState, useEffect } from 'react';

export type TableSelection = number[];
export interface GameResult {
  operation: string;
  userAnswer: number;
  correctAnswer: number;
  timeSpent: number; // in seconds
  isCorrect: boolean;
  points: number;
}

interface HighScore {
  username: string;
  score: number;
  time: number;
  points: number;
  date: string;
}

interface GameContextType {
  username: string;
  setUsername: (name: string) => void;
  selectedTables: TableSelection;
  setSelectedTables: (tables: TableSelection) => void;
  gameResults: GameResult[];
  addGameResult: (result: GameResult) => void;
  resetGameResults: () => void;
  highScores: HighScore[];
  addHighScore: (score: number, time: number, points: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>(() => {
    const savedUsername = localStorage.getItem('username');
    return savedUsername || '';
  });

  // Ne plus sauvegarder les tables dans le localStorage
  const [selectedTables, setSelectedTables] = useState<TableSelection>([]);

  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [highScores, setHighScores] = useState<HighScore[]>(() => {
    const saved = localStorage.getItem('highScores');
    return saved ? JSON.parse(saved) : [];
  });

  // Sauvegarder le nom d'utilisateur dans localStorage
  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  // Sauvegarder les high scores
  useEffect(() => {
    localStorage.setItem('highScores', JSON.stringify(highScores));
  }, [highScores]);

  const addGameResult = (result: GameResult) => {
    setGameResults(prev => [...prev, result]);
  };

  const resetGameResults = () => {
    setGameResults([]);
  };

  const addHighScore = (score: number, time: number, points: number) => {
    const newHighScore: HighScore = {
      username,
      score,
      time,
      points,
      date: new Date().toISOString()
    };

    const updatedHighScores = [...highScores, newHighScore]
      .sort((a, b) => b.points - a.points)
      .slice(0, 10); // Garder seulement les 10 meilleurs scores

    setHighScores(updatedHighScores);
    
    try {
      localStorage.setItem('highScores', JSON.stringify(updatedHighScores));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des high scores:', error);
    }
  };

  const value = {
    username,
    setUsername,
    selectedTables,
    setSelectedTables,
    gameResults,
    addGameResult,
    resetGameResults,
    highScores,
    addHighScore
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

