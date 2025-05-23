// src/components/ConjugationGame.tsx
import React, { useState, useEffect } from 'react';
import { Pronom, ConjugaisonParTemps, Temps } from '../types/index';
import { cn } from '../lib/utils';

interface ConjugationGameProps {
  verb: string;
  temps: Temps;
  conjugationData: ConjugaisonParTemps;
  onReset?: () => void;
}

const ConjugaisonGame: React.FC<ConjugationGameProps> = ({
  verb,
  temps,
  conjugationData,
  onReset
}) => {
  const [userAnswers, setUserAnswers] = useState<Partial<ConjugaisonParTemps>>({});
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Définir l'ordre des pronoms
  const pronomsOrder: Pronom[] = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];

  useEffect(() => {
    // Initialize userAnswers with empty strings for each pronoun
    const initialAnswers: Partial<ConjugaisonParTemps> = {};
    pronomsOrder.forEach((pronom) => {
      initialAnswers[pronom] = '';
    });
    setUserAnswers(initialAnswers);
  }, [conjugationData]);

  const handleInputChange = (pronom: Pronom, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [pronom]: value
    }));
  };

  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ') // Remplace les espaces multiples par un seul espace
      .normalize('NFD') // Décompose les caractères accentués
      .replace(/[\u0300-\u036f]/g, ''); // Supprime les diacritiques (accents)
  };

  const checkAnswers = () => {
    let allCorrect = true;
    const incorrectAnswers: string[] = [];

    console.log('Données de conjugaison reçues:', conjugationData);
    console.log('Réponses utilisateur:', userAnswers);

    pronomsOrder.forEach((pronom) => {
      let correctAnswer = '';
      
      // Gérer les pronoms combinés
      if (pronom === 'il/elle') {
        // Utiliser la conjugaison de 'il/elle' directement
        correctAnswer = normalizeAnswer(conjugationData['il/elle'] || '');
      } else if (pronom === 'ils/elles') {
        // Utiliser la conjugaison de 'ils/elles' directement
        correctAnswer = normalizeAnswer(conjugationData['ils/elles'] || '');
      } else {
        correctAnswer = normalizeAnswer(conjugationData[pronom] || '');
      }

      const userAnswer = normalizeAnswer(userAnswers[pronom] || '');

      console.log(`Vérification pour ${pronom}:`, {
        correctAnswer,
        userAnswer,
        match: correctAnswer === userAnswer
      });

      if (userAnswer !== correctAnswer) {
        allCorrect = false;
        incorrectAnswers.push(`${pronom}: ${userAnswer} (correct: ${correctAnswer})`);
      }
    });

    if (allCorrect) {
      setMessage({ text: 'Bravo ! Toutes les réponses sont correctes !', type: 'success' });
    } else {
      setMessage({ 
        text: 'Certaines réponses sont incorrectes. Vérifiez vos réponses.', 
        type: 'error' 
      });
      console.log('Réponses incorrectes:', incorrectAnswers);
    }
  };

  const resetGame = () => {
    const initialAnswers: Partial<ConjugaisonParTemps> = {};
    pronomsOrder.forEach((pronom) => {
      initialAnswers[pronom] = '';
    });
    setUserAnswers(initialAnswers);
    setMessage(null);
    if (onReset) onReset();
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {pronomsOrder.map((pronom) => (
          <div key={pronom} className="flex items-center gap-4">
            <label className="w-24 font-medium">{pronom}</label>
            <input
              type="text"
              value={userAnswers[pronom] || ''}
              onChange={(e) => handleInputChange(pronom, e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez la conjugaison"
            />
          </div>
        ))}
      </div>

      {message && (
        <div className={cn(
          "p-4 rounded-lg text-center",
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        )}>
          {message.text}
        </div>
      )}

      <div className="flex justify-center gap-4">
        <button
          onClick={checkAnswers}
          className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Vérifier
        </button>
        <button
          onClick={resetGame}
          className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default ConjugaisonGame;