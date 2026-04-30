'use client';
import { Sparkles, Calculator, Timer, BookOpen, Globe, Grid, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const games = [
  {
    id: 1,
    title: 'Tables de Multiplication',
    description: 'Entraînez-vous aux tables de multiplication avec des quiz interactifs et suivez votre progression',
    path: '/game1',
    icon: Calculator,
    color: 'from-blue-600 to-purple-600' // Couleurs un peu plus saturées pour le dark
  },
  {
    id: 2,
    title: 'Multiplication Rapide',
    description: 'Testez votre vitesse avec 20 multiplications aléatoires en 2 minutes !',
    path: '/game2',
    icon: Timer,
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 3,
    title: 'Grille de Multiplication',
    description: 'Trouvez les résultats de la table de multiplication dans une grille de nombres !',
    path: '/game3',
    icon: Grid,
    color: 'from-emerald-600 to-blue-600'
  },
  {
    id: 4,
    title: 'English Conjugation',
    description: 'Practice English verb conjugation with interactive exercises and track your progress',
    path: '/game4',
    icon: Globe,
    color: 'from-orange-600 to-amber-600'
  },
  {
    id: 5,
    title: 'Jeu de conjugaison',
    description: 'Améliorez votre conjugaison avec des exercices interactifs et suivez votre progression',
    path: '/game5',
    icon: BookOpen,
    color: 'from-pink-600 to-rose-600'
  },
];

export default function HomePage() {
  const { user, logout } = useUser();
  const router = useRouter();

  return (
    // CHANGEMENT : Utilisation de bg-background au lieu de dégradé clair
    <div className="min-h-screen bg-background text-foreground py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header avec bouton Connexion/Déconnexion */}
        <div className="flex justify-end items-center mb-4">
          {user ? (
            <div className="flex items-center gap-3">
              {/* CHANGEMENT : text-primary au lieu de blue-700 */}
              <span className="text-primary font-semibold">{user.pseudo}</span>
              <button
                onClick={logout}
                className="flex items-center gap-1 px-3 py-1.5 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg font-bold transition"
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4" /> Déconnexion
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="flex items-center gap-1 px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-bold transition"
              title="Connexion"
            >
              <LogIn className="w-4 h-4" /> Connexion
            </button>
          )}
        </div>

        {/* Header central */}
        <div className="text-center mb-8 sm:mb-12 relative">
          <h1 className="text-3xl sm:text-5xl font-display font-bold mb-2 sm:mb-4 tracking-tight">
            <span className="text-red-500">Red</span>
            <span className="text-muted-foreground">①</span>
            <span className="text-green-500">Mania</span>
          </h1>
          {/* CHANGEMENT : text-muted-foreground au lieu de blue-600 */}
          <p className="text-base sm:text-xl text-muted-foreground mb-4 sm:mb-6">
            Bienvenue dans votre espace de jeux et de révision !
          </p>
          <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 animate-bounce">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
          </div>
        </div>

        {/* Grille de jeux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {games.map((game) => (
            <Link
              key={game.id}
              href={game.path}
              className={cn(
                "group relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-8 transition-all duration-300",
                "bg-gradient-to-br shadow-2xl", game.color,
                "transform hover:scale-[1.02] active:scale-[0.98]",
                "border border-white/10"
              )}
            >
              {/* Overlay pour effet de profondeur en mode sombre */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-white/20 rounded-xl sm:rounded-2xl backdrop-blur-md">
                    <game.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-white drop-shadow-md">
                    {game.title}
                  </h2>
                </div>
                <p className="text-white/90 text-sm sm:text-lg leading-relaxed">
                  {game.description}
                </p>
                <div className="mt-4 sm:mt-6 flex justify-end">
                  <div className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 rounded-lg sm:rounded-xl text-white font-bold text-base sm:text-lg group-hover:bg-white/30 transition-colors border border-white/30">
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