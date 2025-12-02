import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Lock, User, Eye, EyeOff, QrCode } from 'lucide-react';

export default function LoginPage() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = { username: '', password: '' };
    if (!form.username) newErrors.username = 'Nom d\'utilisateur requis';
    if (!form.password) newErrors.password = 'Mot de passe requis';
    
    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    if (form.username === 'admin' && form.password === '1234') {
      setIsLoading(true);
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 2000);
    } else {
      setErrors({ 
        username: '', 
        password: 'Identifiants incorrects' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900/80 via-blue-900/80 to-slate-900/80 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Overlay decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl border-2 border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-3xl p-12 w-full max-w-md animate-slideUp">
        
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 via-transparent to-purple-400/20 opacity-50 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10">
          
          {/* Logo + Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full border-4 border-white/30 shadow-2xl mb-6 backdrop-blur-xl">
              <QrCode className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">E-POINTY</h1>
            <p className="text-white/70 text-sm">Système de gestion de présence</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Nom d'utilisateur
              </label>
              <div className={`flex items-center border-2 rounded-xl px-4 py-3.5 bg-white/10 backdrop-blur-sm transition-all ${
                errors.username 
                  ? 'border-red-400/50 focus-within:border-red-400' 
                  : 'border-white/20 focus-within:border-blue-400/60'
              } hover:bg-white/15`}>
                <User className="text-white/70 mr-3 flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="Entrez votre nom d'utilisateur"
                  value={form.username}
                  onChange={(e) => {
                    setForm({ ...form, username: e.target.value });
                    setErrors({ ...errors, username: '' });
                  }}
                  className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
                  autoComplete="off"
                  style={{ 
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white',
                    caretColor: 'white'
                  }}
                />
              </div>
              {errors.username && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <span>⚠</span> {errors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Mot de passe
              </label>
              <div className={`flex items-center border-2 rounded-xl px-4 py-3.5 bg-white/10 backdrop-blur-sm transition-all ${
                errors.password 
                  ? 'border-red-400/50 focus-within:border-red-400' 
                  : 'border-white/20 focus-within:border-blue-400/60'
              } hover:bg-white/15`}>
                <Lock className="text-white/70 mr-3 flex-shrink-0" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Entrez votre mot de passe"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setErrors({ ...errors, password: '' });
                  }}
                  className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
                  autoComplete="off"
                  style={{ 
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white',
                    caretColor: 'white'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 p-1 hover:bg-white/10 rounded-lg transition-all flex-shrink-0"
                >
                  {showPassword ? (
                    <EyeOff className="text-white/70 hover:text-white transition-colors" size={20} />
                  ) : (
                    <Eye className="text-white/70 hover:text-white transition-colors" size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <span>⚠</span> {errors.password}
                </p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-2 border-white/30 bg-white/10 checked:bg-blue-500 checked:border-blue-500 cursor-pointer transition-all"
                />
                <span className="ml-2 text-sm text-white/70">Se souvenir de moi</span>
              </label>
              <a 
                href="#" 
                className="text-sm text-blue-300 hover:text-blue-200 transition-colors hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95 mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Connexion en cours...</span>
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <span className="text-white/50 text-sm">ou</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Help text */}
          <div className="text-center">
            <p className="text-white/60 text-sm">
              Besoin d'aide ? Contactez l'administrateur
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-white/40">
              © 2025 E-POINTY. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>

      {/* Loader Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-md z-50 flex items-center justify-center animate-fadeIn">
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              {/* Spinner avec gradient */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-purple-400 rounded-full animate-spin"></div>
              </div>
              {/* Icône QR animée */}
              <div className="bg-blue-500/20 p-4 rounded-xl border border-blue-400/30 animate-pulse">
                <QrCode className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-lg mb-1">Connexion en cours</p>
                <p className="text-white/60 text-sm">Préparation de votre espace...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* Force transparent background for autofill */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-background-clip: text;
          -webkit-text-fill-color: white;
          transition: background-color 5000s ease-in-out 0s;
          box-shadow: inset 0 0 0 1000px transparent;
        }
      `}</style>
    </div>
  );
}