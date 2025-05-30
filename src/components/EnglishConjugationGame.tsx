import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

type Pronoun = 'I' | 'you' | 'he/she/it' | 'we' | 'you (plural)' | 'they';
type Tense = 'present' | 'past' | 'future';

interface ConjugationData {
  [key: string]: string;
}

interface EnglishConjugationGameProps {
  verb: string;
  tense: Tense;
  conjugationData: ConjugationData;
  onReset?: () => void;
}

const EnglishConjugationGame: React.FC<EnglishConjugationGameProps> = ({
  verb,
  tense,
  conjugationData,
  onReset
}) => {
  const [userAnswers, setUserAnswers] = useState<Partial<ConjugationData>>({});
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [validatedAnswers, setValidatedAnswers] = useState<Record<Pronoun, boolean>>({} as Record<Pronoun, boolean>);
  const [showResult, setShowResult] = useState<"correct" | "incorrect" | null>(null);

  // Define the order of pronouns
  const pronounsOrder: Pronoun[] = ['I', 'you', 'he/she/it', 'we', 'you (plural)', 'they'];

  useEffect(() => {
    // Initialize userAnswers with empty strings for each pronoun
    const initialAnswers: Partial<ConjugationData> = {};
    pronounsOrder.forEach((pronoun) => {
      initialAnswers[pronoun] = '';
    });
    setUserAnswers(initialAnswers);
  }, [conjugationData]);

  const handleInputChange = (pronoun: Pronoun, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [pronoun]: value
    }));
  };

  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .normalize('NFD') // Decompose accented characters
      .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
  };

  const checkAnswers = () => {
    let allCorrect = true;
    const incorrectAnswers: string[] = [];
    const newValidatedAnswers: Record<Pronoun, boolean> = {} as Record<Pronoun, boolean>;

    pronounsOrder.forEach((pronoun) => {
      const correctAnswer = normalizeAnswer(conjugationData[pronoun] || '');
      const userAnswer = normalizeAnswer(userAnswers[pronoun] || '');
      const isCorrect = userAnswer === correctAnswer;
      newValidatedAnswers[pronoun] = isCorrect;

      if (!isCorrect) {
        allCorrect = false;
        incorrectAnswers.push(`${pronoun}: ${userAnswer} (correct: ${correctAnswer})`);
      }
    });

    setValidatedAnswers(newValidatedAnswers);
    setShowResult(allCorrect ? "correct" : "incorrect");

    // Hide result after 1.5 seconds
    setTimeout(() => {
      setShowResult(null);
    }, 1500);

    if (allCorrect) {
      setMessage({ text: 'Great job! All answers are correct!', type: 'success' });
    } else {
      setMessage({ 
        text: 'Some answers are incorrect. Please check your answers.', 
        type: 'error' 
      });
      console.log('Incorrect answers:', incorrectAnswers);
    }
  };

  const resetGame = () => {
    const initialAnswers: Partial<ConjugationData> = {};
    pronounsOrder.forEach((pronoun) => {
      initialAnswers[pronoun] = '';
    });
    setUserAnswers(initialAnswers);
    setMessage(null);
    setValidatedAnswers({} as Record<Pronoun, boolean>);
    setShowResult(null);
    if (onReset) onReset();
  };

  return (
    <div className="space-y-6 relative">
      {showResult && (
        <div className={`absolute inset-0 flex items-center justify-center bg-${showResult === "correct" ? "green" : "red"}-500/20 backdrop-blur-sm rounded-lg z-10`}>
          <div className={`text-6xl font-bold text-${showResult === "correct" ? "green" : "red"}-500`}>
            {showResult === "correct" ? "Correct!" : "Incorrect!"}
          </div>
        </div>
      )}
      
      <div className="grid gap-4">
        {pronounsOrder.map((pronoun) => (
          <div key={pronoun} className="flex items-center gap-4">
            <label className="w-1/6 font-medium">{pronoun}</label>
            <input
              type="text"
              value={userAnswers[pronoun] || ''}
              onChange={(e) => handleInputChange(pronoun, e.target.value)}
              className={cn(
                "flex-1 w-5/6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                Object.keys(validatedAnswers).length > 0 && validatedAnswers[pronoun] === true && "bg-green-50 border-green-500",
                Object.keys(validatedAnswers).length > 0 && validatedAnswers[pronoun] === false && "bg-red-50 border-red-500"
              )}
              placeholder="Enter the conjugation"
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
          Check
        </button>
        <button
          onClick={resetGame}
          className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default EnglishConjugationGame; 