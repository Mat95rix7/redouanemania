import React, { useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, ArrowLeft } from 'lucide-react';
// @ts-ignore
import gsap from 'gsap';

const HeaderJeu: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current && gsap) {
      gsap.fromTo(
        headerRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      );
    }
  }, []);

  if (!user) return null;

  return (
    <div ref={headerRef} className="flex justify-between items-center mb-8 px-2 sm:px-0 animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-bold transition shadow-sm"
        title="Retour"
      >
        <ArrowLeft className="w-4 h-4" /> Retour
      </button>
      <div className="flex items-center gap-3">
        <span className="text-blue-700 font-semibold">{user.pseudo}</span>
        <button
          onClick={logout}
          className="flex items-center gap-1 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-bold transition shadow-sm"
          title="Déconnexion"
        >
          <LogOut className="w-4 h-4" /> Déconnexion
        </button>
      </div>
    </div>
  );
};

export default HeaderJeu; 