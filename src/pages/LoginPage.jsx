import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Lock, User } from 'lucide-react';

export default function LoginPage() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();

    // ⚙️ Vérification simple temporaire (à remplacer plus tard par un appel API)
    if (form.username && form.password) {
      // Exemple : si le user = admin et mdp = 1234
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">e-Pointy</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Champ Nom d'utilisateur */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">Nom d’utilisateur</label>
            <div className="flex items-center border rounded-lg px-3">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ex: admin"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="flex-1 px-2 py-2 outline-none"
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">Mot de passe</label>
            <div className="flex items-center border rounded-lg px-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="flex-1 px-2 py-2 outline-none"
              />
            </div>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
