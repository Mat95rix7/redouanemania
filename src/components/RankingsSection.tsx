import React from 'react';
import RankingPanel from './RankingPanel';

interface RankingsSectionProps {
  show: boolean;
  onToggle: () => void;
  myTopScores: { score: number }[];
  topScores: { pseudo: string; score: number }[];
}

const RankingsSection: React.FC<RankingsSectionProps> = ({ show, onToggle, myTopScores, topScores }) => (
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start mb-8 w-full">
        <RankingPanel title="Mes scores" scores={myTopScores} />
        <RankingPanel title="Top scores" scores={topScores} showPseudo />
      </div>
);

export default RankingsSection; 