
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type TableSelection = number[];
export type GameResult = {
  operation: string;
  userAnswer: number | null;
  correctAnswer: number;
  timeSpent: number; // in seconds
  isCorrect: boolean;
};

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
  const [username, setUsername] = useState<string>('');
  const [selectedTables, setSelectedTables] = useState<TableSelection>([]);
  const [currentGameResults, setCurrentGameResults] = useState<GameResult[]>([]);
  const [highScores, setHighScores] = useState<{ username: string; score: number; time: number }[]>([]);

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
