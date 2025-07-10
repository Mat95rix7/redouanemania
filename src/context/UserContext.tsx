import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

interface User {
  uid: string;
  pseudo: string;
  scores: Record<string, number[]>;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (pseudo: string) => Promise<void>;
  logout: () => void;
  updateScore: (gameKey: string, score: number) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Persistance locale (localStorage)
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Login par pseudo (vérifie unicité, crée ou charge l'utilisateur)
  const login = async (pseudo: string) => {
    setLoading(true);
    const usersRef = collection(db, 'users');
    const userDoc = doc(usersRef, pseudo);
    const snap = await getDoc(userDoc);
    if (snap.exists()) {
      const data = snap.data();
      setUser({
        uid: pseudo,
        pseudo,
        scores: data.scores || {},
      });
    } else {
      await setDoc(userDoc, { pseudo, scores: {} });
      setUser({
        uid: pseudo,
        pseudo,
        scores: {},
      });
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Met à jour le score d'un jeu dans Firestore et dans le contexte utilisateur
  const updateScore = async (gameKey: string, score: number) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.pseudo);
    // Récupérer les anciens scores (tableau ou undefined)
    const prevScores = Array.isArray(user.scores[gameKey]) ? user.scores[gameKey] : (typeof user.scores[gameKey] === 'number' ? [user.scores[gameKey]] : []);
    // Ajouter le nouveau score seulement s'il n'existe pas déjà
    let newScores = prevScores.includes(score) ? prevScores : [...prevScores, score];
    // Trier et garder les 3 meilleurs
    newScores = newScores.sort((a, b) => b - a).slice(0, 3);
    await updateDoc(userRef, {
      [`scores.${gameKey}`]: newScores
    });
    setUser((prev) => prev ? {
      ...prev,
      scores: {
        ...prev.scores,
        [gameKey]: newScores
      }
    } : prev);
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout, updateScore }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
} 