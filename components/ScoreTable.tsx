// import React from 'react';
// import { Trophy } from 'lucide-react';

// interface Multiplication {
//   num1: number;
//   num2: number;
//   answer: number;
//   userAnswer: string;
// }

// interface GameResult {
//   pseudo: string;
//   score: number;
//   date: string;
//   multiplications: Multiplication[];
// }

// interface ScoreTableProps {
//   results: GameResult[];
//   pseudo: string;
//   formatDate: (dateString: string) => string;
// }

// const ScoreTable: React.FC<ScoreTableProps> = ({ results, pseudo, formatDate }) => {
//   const userResults = results
//     .filter(result => result.pseudo === pseudo)
//     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

//   return (
//     <div className="bg-white/80 rounded-2xl p-6 shadow-xl border-2 border-blue-200">
//       <h3 className="text-2xl font-bold text-blue-600 mb-4">Mon historique</h3>
//       <div className="space-y-3">
//         {userResults.map((result, index) => (
//           <div
//             key={index}
//             className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-blue-100 hover:scale-[1.02] transition-transform"
//           >
//             <div className="flex items-center gap-3">
//               <Trophy className="h-5 w-5 text-yellow-500" />
//               <span className="text-lg text-blue-600">{formatDate(result.date)}</span>
//             </div>
//             <span className="text-xl font-bold text-blue-600">{result.score}/20</span>
//           </div>
//         ))}
//         {userResults.length === 0 && (
//           <div className="text-center text-blue-500 py-6 text-lg">
//             Aucun résultat enregistré
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ScoreTable;

import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreTableProps {
  scores: { score: number }[];
  pseudo: string;
}

const ScoreTable: React.FC<ScoreTableProps> = ({ scores, pseudo }) => {
  return (
    <div className="bg-white/80 rounded-2xl p-6 shadow-xl border-2 border-blue-200">
      <h3 className="text-2xl font-bold text-blue-600 mb-2">Mes meilleurs scores</h3>
      <p className="text-blue-400 text-sm mb-4">{pseudo}</p>
      <div className="space-y-3">
        {scores.map((result, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-blue-100 hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-3">
              <Trophy className={`h-5 w-5 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-amber-600'}`} />
              <span className="text-lg text-blue-600">#{index + 1}</span>
            </div>
            <span className="text-xl font-bold text-blue-600">{result.score}/20</span>
          </div>
        ))}
        {scores.length === 0 && (
          <div className="text-center text-blue-500 py-6 text-lg">
            Aucun résultat enregistré
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreTable;