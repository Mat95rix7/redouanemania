import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import Header from '../components/Header';
import TableSelector from '../components/TableSelector';
import { ChevronRight } from 'lucide-react';
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

  const handleSubmit = () => {
    if (selectedTables.length === 0) {
      setError('Veuillez sélectionner au moins une table');
      return;
    }
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-display font-semibold mb-1">
            Bonjour, {username} 👋
          </h1>
          <p className="text-muted-foreground">
            Sélectionnez les tables de multiplication sur lesquelles vous souhaitez vous exercer
          </p>
        </div>
        
        <TableSelector 
          selectedTables={selectedTables} 
          onSelectTable={handleSelectTable} 
        />
        
        {error && (
          <div className="mt-4 text-sm text-red-500 text-center animate-fade-in">
            {error}
          </div>
        )}
        
        <div className="mt-12 flex justify-center animate-scale-in">
          <button
            onClick={handleSubmit}
            className={cn(
              "py-3 px-6 rounded-xl flex items-center gap-2 transition-all hover-scale",
              "bg-primary text-white font-medium shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary/50"
            )}
          >
            Commencer le quiz
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default SelectTables;
