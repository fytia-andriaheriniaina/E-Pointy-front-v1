import { useState } from 'react';
import { X, Mail, Phone } from 'lucide-react';

export default function StudentFormModal({ onClose, onAdd, filieres = [] }) {
  const [newStudent, setNewStudent] = useState({
    nom: '',
    prenom: '',
    matricule: '',
    email: '',
    telephone: '',
    dateNaissance: '',
    lieuNaissance: '',
    adresse: '',
    filiere: '',
    niveau: '',
    anneeInscription: '',
    nomUrgence: '',
    telUrgence: '',
    genre: ''
  });

  const handleSubmit = () => {
    const required = ['nom', 'prenom', 'matricule', 'email', 'telephone', 'dateNaissance', 'filiere', 'niveau'];
    const emptyFields = required.filter(f => !newStudent[f]);
    if (emptyFields.length > 0) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }
    onAdd(newStudent);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-2 md:p-4">
      {/* Fond semi-transparent */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Card modal */}
      <div className="relative z-10 bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl w-full max-w-4xl p-6 md:p-8 animate-fadeInUp overflow-y-auto max-h-[85vh]">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black/70 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center uppercase text-black">
          Inscrire un étudiant
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Nom */}
          <div>
            <label className="text-black mb-1 block">Nom *</label>
            <input
              type="text"
              placeholder="Nom de famille"
              value={newStudent.nom}
              onChange={e => setNewStudent({ ...newStudent, nom: e.target.value })}
              className="w-full bg-transparent border border-black/30 text-black placeholder-black/40 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />
          </div>

          {/* Prénom */}
          <div>
            <label className="text-black mb-1 block">Prénom *</label>
            <input
              type="text"
              placeholder="Prénom(s)"
              value={newStudent.prenom}
              onChange={e => setNewStudent({ ...newStudent, prenom: e.target.value })}
              className="w-full bg-transparent border border-black/30 text-black placeholder-black/40 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />
          </div>

          {/* Matricule */}
          <div>
            <label className="text-black mb-1 block">Matricule *</label>
            <input
              type="text"
              placeholder="Ex: ETU001"
              value={newStudent.matricule}
              onChange={e => setNewStudent({ ...newStudent, matricule: e.target.value })}
              className="w-full bg-transparent border border-black/30 text-black placeholder-black/40 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="text-black mb-1 block">Genre *</label>
            <select
              value={newStudent.genre}
              onChange={e => setNewStudent({ ...newStudent, genre: e.target.value })}
              className="w-full bg-transparent border border-black/30 text-black rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            >
              <option value="">Sélectionner</option>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>

          {/* Date de naissance */}
          <div>
            <label className="text-black mb-1 block">Date de naissance *</label>
            <input
              type="date"
              value={newStudent.dateNaissance}
              onChange={e => setNewStudent({ ...newStudent, dateNaissance: e.target.value })}
              className="w-full bg-transparent border border-black/30 text-black placeholder-black/40 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />
          </div>

          {/* Lieu de naissance */}
          <div>
            <label className="text-black mb-1 block">Lieu de naissance</label>
            <input
              type="text"
              placeholder="Ex: Antananarivo"
              value={newStudent.lieuNaissance}
              onChange={e => setNewStudent({ ...newStudent, lieuNaissance: e.target.value })}
              className="w-full bg-transparent border border-black/30 text-black placeholder-black/40 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />
          </div>

          {/* Adresse */}
          <div className="md:col-span-2">
            <label className="text-black mb-1 block">Adresse complète</label>
            <input
              type="text"
              placeholder="Ex: Lot IVA 23 Ambohipo, Antananarivo"
              value={newStudent.adresse}
              onChange={e => setNewStudent({ ...newStudent, adresse: e.target.value })}
              className="w-full bg-transparent border border-black/30 text-black placeholder-black/40 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-black mb-1 block">Email *</label>
            <div className="flex items-center border border-black/30 rounded-lg px-2 py-1.5 bg-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
              <Mail className="w-4 h-4 mr-2 text-black/70" />
              <input
                type="email"
                placeholder="exemple@email.com"
                value={newStudent.email}
                onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
                className="w-full bg-transparent text-black placeholder-black/40 outline-none"
              />
            </div>
          </div>

          {/* Téléphone */}
          <div>
            <label className="text-black mb-1 block">Téléphone *</label>
            <div className="flex items-center border border-black/30 rounded-lg px-2 py-1.5 bg-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
              <Phone className="w-4 h-4 mr-2 text-black/70" />
              <input
                type="tel"
                placeholder="+261 34 12 345 67"
                value={newStudent.telephone}
                onChange={e => setNewStudent({ ...newStudent, telephone: e.target.value })}
                className="w-full bg-transparent text-black placeholder-black/40 outline-none"
              />
            </div>
          </div>

          {/* Contact d'urgence */}
          <div>
            <label className="text-black mb-1 block">Contact d'urgence (Nom)</label>
            <input
              type="text"
              placeholder="Nom du contact"
              value={newStudent.nomUrgence}
              onChange={e => setNewStudent({ ...newStudent, nomUrgence: e.target.value })}
              className="w-full bg-transparent border border-black/30 text-black placeholder-black/40 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />
          </div>

          <div>
            <label className="text-black mb-1 block">Contact d'urgence (Tél)</label>
            <input
              type="tel"
              placeholder="+261 32 98 765 43"
              value={newStudent.telUrgence}
              onChange={e => setNewStudent({ ...newStudent, telUrgence: e.target.value })}
              className="w-full bg-transparent border border-black/30 text-black placeholder-black/40 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />
          </div>

          {/* Filière */}
          <div>
            <label className="text-black mb-1 block">Filière *</label>
            <select
              value={newStudent.filiere}
              onChange={e => setNewStudent({ ...newStudent, filiere: e.target.value })}
              className="w-full bg-transparent border border-black/30 text-black rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            >
              <option value="">Sélectionner une filière</option>
              {filieres?.map(f => (
                <option key={f.id} value={f.nom}>{f.nom}</option>
              ))}
            </select>
          </div>

          {/* Niveau */}
          <div>
            <label className="text-black mb-1 block">Niveau *</label>
            <select
              value={newStudent.niveau}
              onChange={e => setNewStudent({ ...newStudent, niveau: e.target.value })}
              className="w-full bg-transparent border border-black/30 text-black rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            >
              <option value="">Sélectionner un niveau</option>
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
            </select>
          </div>

          {/* Année d'inscription */}
          <div>
            <label className="text-black mb-1 block">Année d'inscription</label>
            <input
              type="text"
              placeholder="Ex: 2024"
              value={newStudent.anneeInscription}
              onChange={e => setNewStudent({ ...newStudent, anneeInscription: e.target.value })}
              className="w-full bg-transparent border border-black/30 text-black placeholder-black/40 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />
          </div>

        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white/20 text-black rounded-lg hover:bg-white/30 transition-all duration-200"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Inscrire l'étudiant
          </button>
        </div>

        <p className="text-xs text-black/50 mt-2">* Champs obligatoires</p>

        <style>
          {`
            @keyframes fadeInUp {
              0% { opacity: 0; transform: translateY(10px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeInUp {
              animation: fadeInUp 0.4s ease-out forwards;
            }
          `}
        </style>
      </div>
    </div>
  );
}
