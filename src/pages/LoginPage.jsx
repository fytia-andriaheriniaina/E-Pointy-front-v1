import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/react.svg';

export default function LoginPage() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username && form.password) {
      if (form.username === 'admin' && form.password === '1234') {
        setIsAuthenticated(true);
      } else {
        alert('Nom d’utilisateur ou mot de passe incorrect.');
      }
    } else {
      alert('Veuillez entrer vos identifiants.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#001F54]">
      {/* Carte glassmorphism agrandie */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-14 w-full max-w-lg animate-fadeInUp">
        {/* Logo + e-Pointy */}
        <div className="flex items-center justify-center mb-12 space-x-3">
          <img src={logo} alt="Logo e-Pointy" className="w-12 h-12" />
          <h2 className="text-5xl font-bold text-white drop-shadow-md">E-Pointy</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Nom d'utilisateur */}
          <div className="flex items-center border border-white/30 rounded-xl px-4 py-3 bg-white/10 focus-within:ring-2 focus-within:ring-[#FF3B30] transition-all duration-300">
            <User className="text-white/70 mr-3" />
            <input
              type="text"
              placeholder="Nom d’utilisateur"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="flex-1 bg-transparent text-white placeholder-white/60 outline-none"
            />
          </div>

          {/* Mot de passe */}
          <div className="flex items-center border border-white/30 rounded-xl px-4 py-3 bg-white/10 focus-within:ring-2 focus-within:ring-[#FF3B30] transition-all duration-300">
            <Lock className="text-white/70 mr-3" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mot de passe"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="flex-1 bg-transparent text-white placeholder-white/60 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="text-white/70 hover:text-[#FF3B30] transition-colors duration-300" />
              ) : (
                <Eye className="text-white/70 hover:text-[#FF3B30] transition-colors duration-300" />
              )}
            </button>
          </div>

          {/* Bouton de connexion */}
          <button
            type="submit"
            className="w-full bg-[#FF3B30] hover:bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-red-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            Se connecter
          </button>
        </form>

        {/* Mot de passe oublié */}
        <div className="text-center mt-5 text-white/60 text-sm">
          <a href="#" className="hover:underline hover:text-white transition-colors duration-300">
            Mot de passe oublié ?
          </a>
        </div>
      </div>

      {/* Animations Tailwind personnalisées */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
