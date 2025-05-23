import { Link } from 'react-router-dom';

const games = [
  {
    id: 1,
    title: 'Tables de Multiplication',
    description: 'Entraînez-vous aux tables de multiplication avec des quiz interactifs et suivez votre progression',
    path: '/game1'
  },
  {
    id: 2,
    title: 'Multiplication Rapide',
    description: 'Testez votre vitesse avec 20 multiplications aléatoires en 2 minute !',
    path: '/game2'
  },
  {
    id: 3,
    title: 'Jeu de conjugaison',
    description: 'Améliorez votre conjugaison avec des exercices interactifs et suivez votre progression',
    path: '/game3'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Fast Math Arena
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {games.map((game) => (
            <Link
              key={game.id}
              to={game.path}
              className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {game.title}
              </h2>
              <p className="text-gray-600">
                {game.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 