import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { useGameContext } from '../context/GameContext.tsx';
import { cn } from '@/lib/utils';

const Index = () => {
  const { setUsername } = useGameContext();
  const [inputValue, setInputValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUsername(inputValue.trim());
      navigate('/game1/select-tables');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </button>

      <div 
        className={cn(
          "max-w-md w-full transition-all duration-500 transform",
          isAnimating 
            ? "translate-y-10 opacity-0" 
            : "translate-y-0 opacity-100"
        )}
      >
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="text-5xl font-display font-bold text-primary">
                MultiTable
              </div>
              <Sparkles className="absolute -top-2 -right-6 w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <p className="text-muted-foreground text-lg">
            Testez vos connaissances des tables de multiplication
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-8 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-foreground"
              >
                Entrez votre pseudo
              </label>
              <input
                id="username"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border bg-white/50 backdrop-blur-sm 
                           focus:ring-2 focus:ring-primary/50 focus:outline-none"
                placeholder="Votre pseudo"
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={cn(
                "w-full py-3 px-4 rounded-xl transition-all hover-scale",
                "bg-primary text-white font-medium shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                !inputValue.trim() && "opacity-50 cursor-not-allowed hover:scale-100"
              )}
            >
              Commencer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
