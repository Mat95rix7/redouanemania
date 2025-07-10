import React from 'react';
import RankingsSection from './RankingsSection';
import { Button } from './ui/button';
import { RotateCcw, Home } from 'lucide-react';

interface ResultsSectionProps {
  animatedScore: number;
  myTopScores: { score: number }[];
  topScores: { pseudo: string; score: number }[];
  onRestart: () => void;
  onHome: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  animatedScore,
  myTopScores,
  topScores,
  onRestart,
  onHome,
}) => (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
    <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
    
      <div className="bg-white rounded-3xl p-8 shadow-lg mb-6 text-center">
      <div className="text-lg  mb-4">Vous avez réalisez :</div>
        <div className="text-6xl font-bold text-primary mb-2">
          {animatedScore.toLocaleString()}
        </div>
        <div className="text-lg text-muted-foreground mb-4">points</div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start mb-8">
        <RankingsSection show={true} onToggle={() => {}} myTopScores={myTopScores} topScores={topScores} />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRestart} className="flex items-center gap-2">
          <RotateCcw className="h-5 w-5" />
          Nouveau Quiz
        </Button>
        <Button onClick={onHome} variant="outline" className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          Retour à l'accueil
        </Button>
      </div>
    </main>
  </div>
);

export default ResultsSection; 