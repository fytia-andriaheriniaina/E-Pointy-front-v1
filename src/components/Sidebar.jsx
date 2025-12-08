import { useContext, useState } from 'react';
import { QrCode, BarChart3, Users, BookOpen, ClipboardList, LogOut, Menu, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Sidebar() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* ✅ Bouton menu À DROITE */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 sm:p-3
          bg-gradient-to-br from-slate-900/80 via-blue-900/80 text-white
          rounded-lg sm:rounded-xl shadow-lg border-2 border-white/20 backdrop-blur-md
          hover:scale-110 active:scale-95 transition-all"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>

      {/* Overlay mobile */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
        />
      )}

      {/* ✅ SIDEBAR À DROITE */}
      <aside
        className={`
          fixed lg:sticky top-0 right-0 h-screen
          w-64 sm:w-72 lg:w-64
          bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 
          backdrop-blur-xl border-l-2 border-white/10 
          transition-transform duration-300 ease-in-out z-40
          flex-shrink-0
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

        <div className="relative z-10 p-3 sm:p-4 pt-16 sm:pt-14 lg:pt-20 flex flex-col h-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

          {/* Logo */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-blue-500/30 p-2 rounded-lg border border-blue-400/30">
                <QrCode className="w-6 h-6 text-blue-400" />
              </div>
              <h1 className="text-xl font-bold text-white">E-POINTY</h1>
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
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg
                     transition-all border-2 backdrop-blur-sm ${
                      isActive 
                        ? `${colorClasses.active} shadow-lg font-semibold` 
                        : `${colorClasses.inactive} border-white/10 hover:scale-[1.02]`
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className={`${isActive ? 'bg-white/20' : 'bg-white/5'} p-2 rounded-lg border ${isActive ? 'border-white/30' : 'border-white/10'}`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : colorClasses.icon}`} />
                      </div>

                      <span className="truncate text-sm sm:text-base">{item.label}</span>

                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-3 sm:my-4"></div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-center gap-2
              bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30
              text-red-300 hover:text-red-200 rounded-lg border-2 border-red-400/30
              transition-all backdrop-blur-sm hover:scale-[1.02] active:scale-95 font-semibold shadow-lg text-sm"
          >
            <div className="bg-red-500/30 p-1.5 sm:p-2 rounded-lg border border-red-400/30">
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span>Déconnexion</span>
          </button>

          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-xs text-white/40">v1.0.0</p>
          </div>

        </div>
      </aside>
    </>
  );
}
