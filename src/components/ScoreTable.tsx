import React from 'react';
import { Trophy } from 'lucide-react';

interface GameResult {
  username: string;
  score: number;
  date: string;
  multiplications: any[];
}

interface ScoreTableProps {
  results: GameResult[];
  username: string;
  formatDate: (dateString: string) => string;
}

const ScoreTable: React.FC<ScoreTableProps> = ({ results, username, formatDate }) => {
  const userResults = results
    .filter(result => result.username === username)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white/80 rounded-2xl p-6 shadow-xl border-2 border-blue-200">
      <h3 className="text-2xl font-bold text-blue-600 mb-4">Mon historique</h3>
      <div className="space-y-3">
        {userResults.map((result, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-blue-100 hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-lg text-blue-600">{formatDate(result.date)}</span>
            </div>
            <span className="text-xl font-bold text-blue-600">{result.score}/20</span>
          </div>
        ))}
        {userResults.length === 0 && (
          <div className="text-center text-blue-500 py-6 text-lg">
            Aucun résultat enregistré
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreTable;
