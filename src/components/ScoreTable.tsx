import React from 'react';
import { useGameContext } from '../context/GameContext.tsx';
import { Star, Clock, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const ScoreTable = () => {
  const { highScores, username } = useGameContext();

  if (highScores.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Aucun score enregistré
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-8">
      <h2 className="text-xl font-bold mb-6">Meilleurs scores</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-muted-foreground border-b">
              <th className="pb-3">Joueur</th>
              <th className="pb-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Points</span>
                </div>
              </th>
              <th className="pb-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Score</span>
                </div>
              </th>
              <th className="pb-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>Temps</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {highScores.map((score, index) => (
              <tr 
                key={index}
                className={cn(
                  "border-b last:border-0",
                  score.username === username && "bg-primary/5"
                )}
              >
                <td className="py-3">{score.username}</td>
                <td className="py-3 text-center font-medium">{score.points}</td>
                <td className="py-3 text-center">{score.score}/10</td>
                <td className="py-3 text-center">{score.time.toFixed(1)}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreTable;
