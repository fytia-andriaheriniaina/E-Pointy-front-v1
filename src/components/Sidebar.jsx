import { useContext } from 'react';
import { QrCode, BarChart3, Users, BookOpen, ClipboardList, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Sidebar() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: BarChart3, label: 'Tableau de bord' },
    { path: '/students', icon: Users, label: 'Étudiants' },
    { path: '/courses', icon: BookOpen, label: 'Cours' },
    { path: '/presences', icon: ClipboardList, label: 'Présences' },
  ];

  return (
    <div className="min-h-screen p-4 relative bg-gray-900 text-white">
      <div className="flex items-center gap-2 mb-8 p-4">
        <QrCode className="w-8 h-8" />
        <h1 className="hidden lg:block text-2xl font-bold">E-POINTY</h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="hidden lg:block">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="absolute bottom-4 left-4 right-4 px-4 py-3 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="hidden lg:block">Déconnexion</span>
      </button>
    </div>
  );
}
