import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type TableSelection = number[];
export interface GameResult {
  operation: string;
  userAnswer: number;
  correctAnswer: number;
  timeSpent: number; // in seconds
  isCorrect: boolean;
}

interface GameContextType {
  username: string;
  setUsername: (name: string) => void;
  selectedTables: TableSelection;
  setSelectedTables: (tables: TableSelection) => void;
  currentGameResults: GameResult[];
  addGameResult: (result: GameResult) => void;
  resetGameResults: () => void;
  highScores: { username: string; score: number; time: number }[];
  addHighScore: (score: number, time: number) => void;
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
  const [highScores, setHighScores] = useState<{ username: string; score: number; time: number }[]>(() => {
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

  const resetGameResults = () => {
    setCurrentGameResults([]);
  };

  const addHighScore = (score: number, time: number) => {
    const newScore = { username, score, time };
    setHighScores(prev => {
      const updatedScores = [...prev, newScore];
      return updatedScores.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        return a.time - b.time;
      }).slice(0, 10); // Keep only top 10
    });
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

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
