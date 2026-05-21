// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';

// export type TableSelection = number[];
// export interface GameResult {
//   operation: string;
//   userAnswer: number;
//   correctAnswer: number;
//   timeSpent: number;
//   isCorrect: boolean;
//   points: number;
// }

// interface HighScore {
//   username: string;
//   score: number;
//   time: number;
//   points: number;
//   date: string;
// }

// interface GameContextType {
//   username: string;
//   setUsername: (name: string) => void;
//   selectedTables: TableSelection;
//   setSelectedTables: (tables: TableSelection) => void;
//   gameResults: GameResult[];
//   addGameResult: (result: GameResult) => void;
//   resetGameResults: () => void;
//   highScores: HighScore[];
//   addHighScore: (score: number, time: number, points: number) => void;
// }

// const GameContext = createContext<GameContextType | undefined>(undefined);

// export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   // Initialisation lazy pour username
//   const [username, setUsername] = useState(() => {
//     if (typeof window === 'undefined') return '';
//     return localStorage.getItem('username') || '';
//   });

//   const [selectedTables, setSelectedTables] = useState<TableSelection>([]);
//   const [gameResults, setGameResults] = useState<GameResult[]>([]);

//   // Initialisation lazy pour highScores
//   const [highScores, setHighScores] = useState<HighScore[]>(() => {
//     if (typeof window === 'undefined') return [];
//     const saved = localStorage.getItem('highScores');
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Sauvegarde username
//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     if (username) localStorage.setItem('username', username);
//     else localStorage.removeItem('username');
//   }, [username]);

//   // Sauvegarde highScores
//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     localStorage.setItem('highScores', JSON.stringify(highScores));
//   }, [highScores]);

//   const addGameResult = (result: GameResult) => setGameResults(prev => [...prev, result]);
//   const resetGameResults = () => setGameResults([]);

//   const addHighScore = (score: number, time: number, points: number) => {
//     const newHighScore: HighScore = {
//       username,
//       score,
//       time,
//       points,
//       date: new Date().toISOString(),
//     };

//     const updatedHighScores = [...highScores, newHighScore]
//       .sort((a, b) => b.points - a.points)
//       .slice(0, 10);

//     setHighScores(updatedHighScores);
//   };

//   return (
//     <GameContext.Provider
//       value={{
//         username,
//         setUsername,
//         selectedTables,
//         setSelectedTables,
//         gameResults,
//         addGameResult,
//         resetGameResults,
//         highScores,
//         addHighScore,
//       }}
//     >
//       {children}
//     </GameContext.Provider>
//   );
// };

// export const useGameContext = () => {
//   const context = useContext(GameContext);
//   if (!context) throw new Error('useGameContext must be used within a GameProvider');
//   return context;
// };

'use client';

import React, { createContext, useContext, useState } from 'react';

export type TableSelection = number[];

export interface GameResult {
  operation: string;
  userAnswer: number;
  correctAnswer: number;
  timeSpent: number;
  isCorrect: boolean;
  points: number;
}

interface GameContextType {
  selectedTables: TableSelection;
  setSelectedTables: (tables: TableSelection) => void;
  gameResults: GameResult[];
  addGameResult: (result: GameResult) => void;
  resetGameResults: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTables, setSelectedTables] = useState<TableSelection>([]);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const addGameResult = (result: GameResult) =>
    setGameResults(prev => [...prev, result]);

  const resetGameResults = () => setGameResults([]);

  return (
    <GameContext.Provider
      value={{
        selectedTables,
        setSelectedTables,
        gameResults,
        addGameResult,
        resetGameResults,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGameContext must be used within a GameProvider');
  return context;
};