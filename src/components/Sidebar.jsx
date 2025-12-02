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
    { path: '/dashboard', icon: BarChart3, label: 'Tableau de bord', color: 'blue' },
    { path: '/students', icon: Users, label: 'Étudiants', color: 'green' },
    { path: '/courses', icon: BookOpen, label: 'Cours', color: 'purple' },
    { path: '/presences', icon: ClipboardList, label: 'Présences', color: 'orange' },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        active: 'bg-blue-500/30 border-blue-400/50 text-blue-300',
        inactive: 'text-white/70 hover:bg-blue-500/10 hover:border-blue-400/30',
        icon: 'text-blue-400'
      },
      green: {
        active: 'bg-green-500/30 border-green-400/50 text-green-300',
        inactive: 'text-white/70 hover:bg-green-500/10 hover:border-green-400/30',
        icon: 'text-green-400'
      },
      purple: {
        active: 'bg-purple-500/30 border-purple-400/50 text-purple-300',
        inactive: 'text-white/70 hover:bg-purple-500/10 hover:border-purple-400/30',
        icon: 'text-purple-400'
      },
      orange: {
        active: 'bg-orange-500/30 border-orange-400/50 text-orange-300',
        inactive: 'text-white/70 hover:bg-orange-500/10 hover:border-orange-400/30',
        icon: 'text-orange-400'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <aside className="w-64 flex-shrink-0 box-border min-h-screen bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl border-r-2 border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        
        {/* Logo/Header */}
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-4 mb-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/30 p-2.5 rounded-xl border border-blue-400/30">
              <QrCode className="w-7 h-7 text-blue-400" />
            </div>
            <h1 className="hidden lg:block text-2xl font-bold text-white">E-POINTY</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const colorClasses = getColorClasses(item.color);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all border-2 backdrop-blur-sm min-h-[3.5rem] box-border ${
                    isActive 
                      ? `${colorClasses.active} shadow-lg font-semibold` 
                      : `${colorClasses.inactive} border-white/10 hover:scale-105`
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`${isActive ? 'bg-white/20' : 'bg-white/5'} p-2 rounded-lg border ${isActive ? 'border-white/30' : 'border-white/10'} flex items-center justify-center w-9 h-9`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : colorClasses.icon}`} />
                    </div>

                    <span className="hidden lg:block truncate">{item.label}</span>

                    {/* Indicateur à droite (ne change pas la largeur du sidebar car width fixe) */}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3.5 flex items-center justify-center gap-3 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-300 hover:text-red-200 rounded-xl border-2 border-red-400/30 hover:border-red-400/50 transition-all backdrop-blur-sm hover:scale-105 active:scale-95 font-semibold shadow-lg"
        >
          <div className="bg-red-500/30 p-2 rounded-lg border border-red-400/30">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="hidden lg:block">Déconnexion</span>
        </button>

        {/* Footer info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-white/40 hidden lg:block">v1.0.0</p>
        </div>
      </div>
    </aside>
  );
}
