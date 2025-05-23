import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

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
  currentGameResults: GameResult[];
  addGameResult: (result: GameResult) => void;
  resetGameResults: () => void;
  highScores: HighScore[];
  addHighScore: (score: number, time: number, points: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialiser les états avec les valeurs du localStorage
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem('username') || '';
  });
  const [selectedTables, setSelectedTables] = useState<TableSelection>(() => {
    const saved = localStorage.getItem('selectedTables');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentGameResults, setCurrentGameResults] = useState<GameResult[]>([]);
  const [highScores, setHighScores] = useState<HighScore[]>(() => {
    const saved = localStorage.getItem('highScores');
    return saved ? JSON.parse(saved) : [];
  });

  // Sauvegarder les changements dans le localStorage
  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem('selectedTables', JSON.stringify(selectedTables));
  }, [selectedTables]);

  useEffect(() => {
    localStorage.setItem('highScores', JSON.stringify(highScores));
  }, [highScores]);

  const addGameResult = (result: GameResult) => {
    setCurrentGameResults(prev => [...prev, result]);
  };

  const resetGameResults = useCallback(() => {
    setCurrentGameResults([]);
  }, []);

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

  return (
    <GameContext.Provider value={{
      username,
      setUsername,
      selectedTables,
      setSelectedTables,
      currentGameResults,
      addGameResult,
      resetGameResults,
      highScores,
      addHighScore
    }}>
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export { useGameContext };

