import React from 'react';

interface RankingPanelProps {
  title: string;
  scores: { pseudo?: string; score: number }[];
  emptyText?: string;
  showPseudo?: boolean;
}

const RankingPanel: React.FC<RankingPanelProps> = ({ title, scores, emptyText = 'Aucun score enregistré', showPseudo = false }) => (
  <div className="bg-white/80 rounded-3xl p-6 shadow-lg border-2 border-blue-200 w-full">
    <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">{title}</h2>
    {scores.length === 0 ? (
      <div className="text-gray-500 text-center">{emptyText}</div>
    ) : (
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left font-semibold text-blue-500 pb-2">#</th>
            {showPseudo && <th className="text-left font-semibold text-blue-500 pb-2">Pseudo</th>}
            <th className="text-left font-semibold text-blue-500 pb-2 ps-3">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((entry, idx) => (
            <tr key={(entry.pseudo || '') + '-' + entry.score + '-' + idx} className="hover:bg-blue-50 transition">
              <td className={
                idx === 0 ? 'text-yellow-500 font-bold text-2xl py-2' :
                idx === 1 ? 'text-gray-400 font-bold text-xl py-2' :
                'text-orange-700 font-bold text-lg py-2'
              }>
                {idx + 1}.
              </td>
              {showPseudo && <td className="font-semibold py-2">{entry.pseudo}</td>}
              <td className="ml-2 text-blue-700 font-bold py-2 ps-3">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default RankingPanel; 