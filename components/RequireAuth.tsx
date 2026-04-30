'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login'); // remplace la route actuelle
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">
        Chargement...
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
