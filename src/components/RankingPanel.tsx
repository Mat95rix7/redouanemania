import React from 'react';

interface RankingPanelProps {
  title: string;
  scores: { pseudo?: string; score: number }[];
  emptyText?: string;
  showPseudo?: boolean;
}

const RankingPanel: React.FC<RankingPanelProps> = ({ title, scores, emptyText = 'Aucun score enregistré', showPseudo = false }) => (
  <div className="bg-white/80 rounded-3xl p-6 shadow-lg border-2 border-blue-200 max-w-xs mx-auto">
    <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">{title}</h2>
    <ol className="flex flex-col items-center gap-2">
      {scores.length === 0 && <li className="text-gray-500">{emptyText}</li>}
      {scores.map((entry, idx) => (
        <li key={(entry.pseudo || '') + '-' + entry.score + '-' + idx} className="flex items-center gap-4 text-lg">
          <span className={idx === 0 ? 'text-yellow-500 font-bold text-2xl' : idx === 1 ? 'text-gray-400 font-bold text-xl' : 'text-orange-700 font-bold text-lg'}>
            {idx + 1}.
          </span>
          {showPseudo && <span className="font-semibold">{entry.pseudo}</span>}
          <span className="ml-2 text-blue-700 font-bold">{entry.score}</span>
        </li>
      ))}
    </ol>
  </div>
);

export default RankingPanel; 