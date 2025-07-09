import React from 'react';
import RankingPanel from './RankingPanel';

interface RankingsSectionProps {
  show: boolean;
  onToggle: () => void;
  myTopScores: { score: number }[];
  topScores: { pseudo: string; score: number }[];
}

const RankingsSection: React.FC<RankingsSectionProps> = ({ show, onToggle, myTopScores, topScores }) => (
  <>
    <div className="flex justify-center mt-8 mb-4">
      <button
        onClick={onToggle}
        className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-lg shadow-md transition-all hover:from-purple-600 hover:to-blue-600 hover:scale-105 active:scale-95"
      >
        {show ? 'Masquer les classements' : 'Afficher les classements'}
      </button>
    </div>
    {show && (
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start mb-8 w-full">
        <RankingPanel title="Mes 3 meilleurs scores" scores={myTopScores} />
        <RankingPanel title="Top 3 des meilleurs scores" scores={topScores} showPseudo />
      </div>
    )}
  </>
);

export default RankingsSection; 