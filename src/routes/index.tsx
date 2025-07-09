import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Game1 from '../pages/Game1';
import Game2 from '../pages/Game2';
import Game3 from '../pages/Game3';
import Game4 from '../pages/Game4';
import Game5 from '../pages/Game5';
import LoginPage from '../pages/Login';
import NotFound from '../pages/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/game1" element={<Game1 />} />
      <Route path="/game2" element={<Game2 />} />
      <Route path="/game3" element={<Game3 />} />
      <Route path="/game4" element={<Game4 />} />
      <Route path="/game5" element={<Game5 onBack={() => window.history.back()} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 