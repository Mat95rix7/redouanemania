import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Clock, 
  Check, 
  X, 
  Star, 
  Award,
  RotateCcw,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Système de points
const SCORING_SYSTEM = {
  CORRECT_ANSWER: 100,
  SPEED_BONUS: {
    UNDER_3_SEC: 50,
    UNDER_5_SEC: 30,
    UNDER_8_SEC: 10
  },
  STREAK_BONUS: {
    STREAK_3: 25,
    STREAK_5: 50,
    STREAK_7: 75,
    STREAK_10: 100
  }
};

const Results = () => {
  const { gameResults, resetGameResults } = useGameContext();
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  // Calculs des résultats
  const correctAnswers = gameResults.filter(result => result.isCorrect).length;
  const totalQuestions = gameResults.length;
  const successRate = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const totalTime = gameResults.reduce((sum, result) => sum + result.timeSpent, 0);
  const averageTime = totalQuestions > 0 ? totalTime / totalQuestions : 0;

  // Calcul du score avec points
  const calculateScore = () => {
    let totalScore = 0;
    let currentStreak = 0;
    let maxStreak = 0;
    const scoreBreakdown = [];

    gameResults.forEach((result, index) => {
      let questionScore = 0;
      
      if (result.isCorrect) {
        // Points de base pour réponse correcte
        questionScore += SCORING_SYSTEM.CORRECT_ANSWER;
        
        // Bonus de vitesse
        let speedBonus = 0;
        if (result.timeSpent < 3) {
          speedBonus = SCORING_SYSTEM.SPEED_BONUS.UNDER_3_SEC;
        } else if (result.timeSpent < 5) {
          speedBonus = SCORING_SYSTEM.SPEED_BONUS.UNDER_5_SEC;
        } else if (result.timeSpent < 8) {
          speedBonus = SCORING_SYSTEM.SPEED_BONUS.UNDER_8_SEC;
        }
        questionScore += speedBonus;
        
        // Gestion des séries
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
      
      totalScore += questionScore;
      scoreBreakdown.push({
        question: index + 1,
        operation: result.operation,
        userAnswer: result.userAnswer,
        correctAnswer: result.correctAnswer,
        isCorrect: result.isCorrect,
        timeSpent: result.timeSpent,
        basePoints: result.isCorrect ? SCORING_SYSTEM.CORRECT_ANSWER : 0,
        speedBonus: result.isCorrect ? (questionScore - SCORING_SYSTEM.CORRECT_ANSWER) : 0,
        totalPoints: questionScore
      });
    });

    // Bonus de série
    let streakBonus = 0;
    if (maxStreak >= 10) {
      streakBonus = SCORING_SYSTEM.STREAK_BONUS.STREAK_10;
    } else if (maxStreak >= 7) {
      streakBonus = SCORING_SYSTEM.STREAK_BONUS.STREAK_7;
    } else if (maxStreak >= 5) {
      streakBonus = SCORING_SYSTEM.STREAK_BONUS.STREAK_5;
    } else if (maxStreak >= 3) {
      streakBonus = SCORING_SYSTEM.STREAK_BONUS.STREAK_3;
    }
    
    totalScore += streakBonus;

    return { totalScore, maxStreak, streakBonus, scoreBreakdown };
  };

  const { totalScore, maxStreak, streakBonus, scoreBreakdown } = calculateScore();

  // Rediriger si pas de résultats
  useEffect(() => {
    if (totalQuestions === 0) {
      console.log('No results found, redirecting...');
      navigate('/game1/select-tables');
      return;
    }
  }, [totalQuestions, navigate]);

  // Animation du score
  useEffect(() => {
    console.log('Results page loaded with', totalQuestions, 'questions');
    console.log('Game results:', gameResults);
    
    if (totalScore > 0) {
      const duration = 2000; // 2 secondes
      const steps = 60;
      const increment = totalScore / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= totalScore) {
          setAnimatedScore(totalScore);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [totalScore, totalQuestions, gameResults]);

  // Déterminer le niveau de performance
  const getPerformanceLevel = () => {
    if (successRate >= 90) return { level: 'Excellent', color: 'text-yellow-500', icon: Trophy };
    if (successRate >= 75) return { level: 'Très bien', color: 'text-green-500', icon: Award };
    if (successRate >= 60) return { level: 'Bien', color: 'text-blue-500', icon: Star };
    if (successRate >= 40) return { level: 'Peut mieux faire', color: 'text-orange-500', icon: Star };
    return { level: 'À retravailler', color: 'text-red-500', icon: Star };
  };

  const performance = getPerformanceLevel();
  const PerformanceIcon = performance.icon;

  if (totalQuestions === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg mb-4">Aucun résultat trouvé</p>
            <Button onClick={() => navigate('/game1/select-tables')}>
              Commencer un quiz
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
        {/* Score principal */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <PerformanceIcon className={cn("h-8 w-8", performance.color)} />
            <h1 className="text-3xl font-bold">Résultats du Quiz</h1>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
            <div className="text-6xl font-bold text-primary mb-2">
              {animatedScore.toLocaleString()}
            </div>
            <div className="text-lg text-muted-foreground mb-4">points</div>
            <div className={cn("text-2xl font-semibold", performance.color)}>
              {performance.level}
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <Check className="h-5 w-5 text-green-500 mr-1" />
              <span className="text-2xl font-bold text-green-500">{correctAnswers}</span>
            </div>
            <div className="text-sm text-muted-foreground">Bonnes réponses</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <X className="h-5 w-5 text-red-500 mr-1" />
              <span className="text-2xl font-bold text-red-500">{totalQuestions - correctAnswers}</span>
            </div>
            <div className="text-sm text-muted-foreground">Erreurs</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-blue-500 mr-1" />
              <span className="text-2xl font-bold text-blue-500">{averageTime.toFixed(1)}s</span>
            </div>
            <div className="text-sm text-muted-foreground">Temps moyen</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-5 w-5 text-orange-500 mr-1" />
              <span className="text-2xl font-bold text-orange-500">{maxStreak}</span>
            </div>
            <div className="text-sm text-muted-foreground">Série max</div>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Taux de réussite</span>
            <span className="text-sm font-medium">{successRate.toFixed(0)}%</span>
          </div>
          <Progress value={successRate} className="h-3" />
        </div>

        {/* Bonus détaillés */}
        {streakBonus > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-8 border border-yellow-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Bonus obtenus
            </h3>
            <div className="flex justify-between items-center">
              <span>Bonus série de {maxStreak} bonnes réponses</span>
              <span className="font-bold text-yellow-600">+{streakBonus} points</span>
            </div>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => {
              resetGameResults();
              navigate('/game1/select-tables');
            }}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            Nouveau Quiz
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Home className="h-5 w-5" />
            Retour à l'accueil
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Results;