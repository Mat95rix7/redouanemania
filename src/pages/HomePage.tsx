import { Link } from 'react-router-dom';
import { Sparkles, Calculator, Timer, BookOpen, Globe, Grid } from 'lucide-react';
import { cn } from '@/lib/utils';

const games = [
  {
    id: 1,
    title: 'Tables de Multiplication',
    description: 'Entraînez-vous aux tables de multiplication avec des quiz interactifs et suivez votre progression',
    path: '/game1',
    icon: Calculator,
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 2,
    title: 'Multiplication Rapide',
    description: 'Testez votre vitesse avec 20 multiplications aléatoires en 2 minutes !',
    path: '/game2',
    icon: Timer,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'Jeu de conjugaison',
    description: 'Améliorez votre conjugaison avec des exercices interactifs et suivez votre progression',
    path: '/game3',
    icon: BookOpen,
    color: 'from-pink-500 to-yellow-500'
  },
  {
    id: 4,
    title: 'English Conjugation',
    description: 'Practice English verb conjugation with interactive exercises and track your progress',
    path: '/game4',
    icon: Globe,
    color: 'from-yellow-500 to-green-500'
  },
  {
    id: 5,
    title: 'Grille de Multiplication',
    description: 'Trouvez les résultats de la table de multiplication dans une grille de nombres !',
    path: '/game5',
    icon: Grid,
    color: 'from-green-500 to-blue-500'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 relative">
          <h1 className="text-5xl font-display font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            RedouaneMania
          </h1>
          <p className="text-xl text-blue-600 mb-6">
            Bienvenue dans votre espace de jeux et de révision !
          </p>
          <div className="absolute -top-4 -right-4 animate-bounce">
            <Sparkles className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Link
              key={game.id}
              to={game.path}
              className={cn(
                "group relative overflow-hidden rounded-3xl p-8 transition-all duration-300",
                "bg-gradient-to-br", game.color,
                "transform hover:scale-[1.02] active:scale-[0.98]",
                "shadow-xl hover:shadow-2xl"
              )}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <game.icon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {game.title}
                  </h2>
                </div>
                <p className="text-white/90 text-lg">
                  {game.description}
                </p>
                <div className="mt-6 flex justify-end">
                  <div className="px-6 py-3 bg-white/20 rounded-xl text-white font-bold text-lg group-hover:bg-white/30 transition-colors">
                    Jouer →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 