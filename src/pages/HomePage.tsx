import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Calculator, Timer, BookOpen, Globe, Grid, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '../context/UserContext';

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
    title: 'Grille de Multiplication',
    description: 'Trouvez les résultats de la table de multiplication dans une grille de nombres !',
    path: '/game3',
    icon: Grid,
    color: 'from-green-500 to-blue-500'
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
    title: 'Jeu de conjugaison',
    description: 'Améliorez votre conjugaison avec des exercices interactifs et suivez votre progression',
    path: '/game5',
    icon: BookOpen,
    color: 'from-pink-500 to-yellow-500'
  },
];

export default function HomePage() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec bouton Connexion/Déconnexion */}
        <div className="flex justify-end items-center mb-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-blue-700 font-semibold">{user.pseudo}</span>
              <button
                onClick={logout}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-bold transition"
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4" /> Déconnexion
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-bold transition"
              title="Connexion"
            >
              <LogIn className="w-4 h-4" /> Connexion
            </button>
          )}
        </div>
        <div className="text-center mb-8 sm:mb-12 relative">
          <h1 className="text-3xl sm:text-5xl font-display font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-4">
            <span className="text-red-600">Red</span>
            <span className="text-gray-500">①</span>
            <span className="text-green-600">Mania</span>
          </h1>
          <p className="text-base sm:text-xl text-blue-600 mb-4 sm:mb-6">
            Bienvenue dans votre espace de jeux et de révision !
          </p>
          <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 animate-bounce">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {games.map((game) => (
            <Link
              key={game.id}
              to={game.path}
              className={cn(
                "group relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-8 transition-all duration-300",
                "bg-gradient-to-br", game.color,
                "transform hover:scale-[1.02] active:scale-[0.98]",
                "shadow-lg hover:shadow-xl"
              )}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-white/20 rounded-xl sm:rounded-2xl">
                    <game.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-white">
                    {game.title}
                  </h2>
                </div>
                <p className="text-white/90 text-sm sm:text-lg">
                  {game.description}
                </p>
                <div className="mt-4 sm:mt-6 flex justify-end">
                  <div className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 rounded-lg sm:rounded-xl text-white font-bold text-base sm:text-lg group-hover:bg-white/30 transition-colors">
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