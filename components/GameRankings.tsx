'use client';
import React from 'react';
import RankingPanel from './RankingPanel';
import { useGameScores } from '@/hooks/useGameScores';
import { useUser } from '@/context/UserContext';

interface GameRankingsProps {
  gameKey: 'game1' | 'game2';
}

const GameRankings: React.FC<GameRankingsProps> = ({ gameKey }) => {
  const { user } = useUser();
  const { topScores, myTopScores } = useGameScores(gameKey);

  const myScores = myTopScores.map(s => ({ score: s.score }));
  const globalScores = topScores.map(s => ({ pseudo: s.pseudo, score: s.score }));

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-start w-full">
      <RankingPanel
        title={`Mes scores — ${user?.pseudo || ''}`}
        scores={myScores}
      />
      <RankingPanel
        title="Top scores"
        scores={globalScores}
        showPseudo
      />
    </div>
  );
};

export default GameRankings;