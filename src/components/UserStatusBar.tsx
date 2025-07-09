import { useUser } from '../context/UserContext';
import { LogOut } from 'lucide-react';

const UserStatusBar = () => {
  const { user, logout } = useUser();

  if (!user) return null;

  return (
    <div className="flex justify-end items-center mb-4">
      <span className="text-blue-700 font-semibold mr-2">{user.pseudo}</span>
      <button
        onClick={logout}
        className="flex items-center gap-1 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-bold transition"
        title="Déconnexion"
      >
        <LogOut className="w-4 h-4" /> Déconnexion
      </button>
    </div>
  );
};

export default UserStatusBar; 