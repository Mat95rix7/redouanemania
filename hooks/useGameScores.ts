'use client';
import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useUser } from '@/context/UserContext';

type TopScore = { username: string; score: number };

export const useGameScores = (gameKey: 'game1' | 'game2') => {
  const { user, updateScore } = useUser();
  const [topScores, setTopScores] = useState<TopScore[]>([]);

  const fetchTopScores = useCallback(async () => {
    const snapshot = await getDocs(collection(db, 'users'));
    const allScores: TopScore[] = [];

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const gameScores = data.scores?.[gameKey];
      if (Array.isArray(gameScores)) {
        gameScores.forEach((score: number) => {
          allScores.push({ username: data.username, score });
        });
      } else if (typeof gameScores === 'number') {
        allScores.push({ username: data.username, score: gameScores });
      }
    });

    allScores.sort((a, b) => b.score - a.score);
    setTopScores(allScores.slice(0, 5));
  }, [gameKey]);

  useEffect(() => {
    fetchTopScores();
  }, [fetchTopScores]);

  const myTopScores: { score: number }[] = Array.isArray(user?.scores?.[gameKey])
    ? (user.scores[gameKey] as number[]).map(score => ({ score }))
    : typeof user?.scores?.[gameKey] === 'number'
    ? [{ score: user.scores[gameKey] as number }]
    : [];

  const saveScore = useCallback(async (score: number) => {
    if (!user) return;
    const existing = Array.isArray(user.scores[gameKey])
      ? (user.scores[gameKey] as number[])
      : typeof user.scores[gameKey] === 'number'
      ? [user.scores[gameKey] as number]
      : [];
    const isNewBest = existing.length < 3 || score > Math.min(...existing);
    if (isNewBest) {
      await updateScore(gameKey, score);
      await fetchTopScores();
    }
  }, [user, gameKey, updateScore, fetchTopScores]);

  return { topScores, myTopScores, saveScore, fetchTopScores };
};