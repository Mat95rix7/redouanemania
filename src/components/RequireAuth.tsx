import React, { ReactNode, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-100">Chargement...</div>;
  }

  return <>{children}</>;
};

export default RequireAuth; 