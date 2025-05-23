import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext.tsx';
import Header from '../components/Header';
import TableSelector from '../components/TableSelector';
import { ChevronRight, Sparkles, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const SelectTables = () => {
  const { username, selectedTables, setSelectedTables } = useGameContext();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSelectTable = (table: number) => {
    setSelectedTables(
      selectedTables.includes(table) 
        ? selectedTables.filter(t => t !== table) 
        : [...selectedTables, table]
    );
    setError(null);
  };

  const handleResetTables = () => {
    setSelectedTables([]);
    setError(null);
  };

  const handleSubmit = () => {
    if (selectedTables.length === 0) {
      setError('Veuillez sélectionner au moins une table');
      return;
    }
    navigate('/game1/quiz', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="relative">
            <h1 className="text-4xl font-display font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bonjour, {username} 👋
            </h1>
            <div className="absolute -top-4 -right-4 animate-bounce">
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <p className="text-xl text-blue-600">
            Choisissez les tables de multiplication que vous voulez réviser !
          </p>
        </div>
        
        <div className="bg-white/80 rounded-3xl p-8 shadow-xl border-2 border-blue-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-600">
              Tables sélectionnées : {selectedTables.length}
            </h2>
            <button
              onClick={handleResetTables}
              className={cn(
                "p-3 rounded-xl transition-all",
                "bg-red-50 text-red-500 hover:bg-red-100",
                "flex items-center gap-2 font-medium",
                "transform hover:scale-105 active:scale-95"
              )}
            >
              <RefreshCw className="h-5 w-5" />
              Réinitialiser
            </button>
          </div>
          <TableSelector 
            selectedTables={selectedTables} 
            onSelectTable={handleSelectTable} 
          />
        </div>
        
        {error && (
          <div className="mt-6 text-lg text-red-500 text-center animate-fade-in font-medium bg-red-50 p-4 rounded-2xl border-2 border-red-200">
            {error}
          </div>
        )}
        
        <div className="mt-12 flex justify-center animate-scale-in">
          <button
            onClick={handleSubmit}
            className={cn(
              "py-5 px-8 rounded-2xl flex items-center gap-3 transition-all",
              "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl",
              "hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 active:scale-95",
              "shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/30"
            )}
          >
            Commencer le quiz
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default SelectTables;
