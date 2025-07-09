import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const LoginPage = () => {
  const { user, login, loading } = useUser();
  const [pseudo, setPseudo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/'); // Redirige vers la home si déjà connecté
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!pseudo.trim()) {
      setError('Le pseudo est requis.');
      return;
    }
    try {
      await login(pseudo.trim());
      // La redirection se fait automatiquement via useEffect
    } catch (e) {
      setError("Erreur lors de la connexion. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-gray-800/90 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-300">Connexion</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-100 mb-1">Pseudo</label>
            <input
              type="text"
              value={pseudo}
              onChange={e => setPseudo(e.target.value)}
              className="w-full rounded-lg border border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-700 px-4 py-2 transition text-gray-100 bg-gray-900 placeholder-gray-400"
              placeholder="Choisissez un pseudo unique"
              autoFocus
              disabled={loading}
            />
          </div>
          {error && <div className="text-red-400 text-center font-semibold">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-700 to-pink-700 text-white font-bold shadow-lg hover:from-purple-800 hover:to-pink-800 transition text-lg"
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 