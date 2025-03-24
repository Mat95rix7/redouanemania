
import React from 'react';
import { Trophy, Clock, CheckCircle } from 'lucide-react';

interface ScoreTableProps {
  scores: {
    username: string;
    score: number;
    time: number;
  }[];
  currentUserName?: string;
}

const ScoreTable: React.FC<ScoreTableProps> = ({ scores, currentUserName }) => {
  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in">
      <h2 className="text-xl font-display font-semibold mb-6 text-center flex items-center justify-center gap-2">
        <Trophy className="h-5 w-5 text-yellow-500" />
        Classement
      </h2>
      
      <div className="overflow-hidden rounded-xl border bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/50 border-b">
                <th className="text-left py-3 px-4 font-medium text-sm">#</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Joueur</th>
                <th className="text-left py-3 px-4 font-medium text-sm flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Score
                </th>
                <th className="text-left py-3 px-4 font-medium text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Temps
                </th>
              </tr>
            </thead>
            <tbody>
              {scores.length > 0 ? (
                scores.map((score, index) => (
                  <tr 
                    key={index} 
                    className={`border-b last:border-0 transition-colors ${
                      score.username === currentUserName 
                        ? 'bg-primary/10 hover:bg-primary/15' 
                        : 'hover:bg-secondary/50'
                    }`}
                  >
                    <td className="py-3 px-4 text-sm">
                      {index === 0 ? (
                        <span className="font-medium text-yellow-500">🥇</span>
                      ) : index === 1 ? (
                        <span className="font-medium text-gray-400">🥈</span>
                      ) : index === 2 ? (
                        <span className="font-medium text-amber-700">🥉</span>
                      ) : (
                        index + 1
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium text-sm">
                      {score.username}
                      {score.username === currentUserName && (
                        <span className="ml-2 text-xs font-normal text-primary">(vous)</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm">{score.score}/10</td>
                    <td className="py-3 px-4 text-sm">{score.time.toFixed(1)}s</td>
                  </tr>
                ))
              ) : (
                <tr className="hover:bg-secondary/50 transition-colors">
                  <td colSpan={4} className="py-8 px-4 text-center text-muted-foreground">
                    Aucun score enregistré pour le moment
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScoreTable;
