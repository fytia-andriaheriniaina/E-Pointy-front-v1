// StudentFormModal.jsx
import { useState } from 'react';
import { Mail, Phone, UserPlus } from 'lucide-react';
import ReusableGlassModal from '../components/ReusableGlassModal';

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
    const empty = required.filter(f => !newStudent[f]);

    if (empty.length > 0) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }
    onAdd(newStudent);
  };

  return (
    <ReusableGlassModal
      title="Inscrire un étudiant"
      icon={<UserPlus className="w-8 h-8 text-blue-400" />}
      onClose={onClose}
      size="2xl"    
       className="text-black text-center uppercase"
      >
      {/* CONTENU DU FORMULAIRE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">

        {/* Nom */}
        <div>
          <label className="text-white mb-1 block">Nom *</label>
          <input
            type="text"
            value={newStudent.nom}
            onChange={e => setNewStudent({ ...newStudent, nom: e.target.value })}
            placeholder="Nom"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Prénom */}
        <div>
          <label className="text-white mb-1 block">Prénom *</label>
          <input
            type="text"
            value={newStudent.prenom}
            onChange={e => setNewStudent({ ...newStudent, prenom: e.target.value })}
            placeholder="Prénom"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Matricule */}
        <div>
          <label className="text-white mb-1 block">Matricule *</label>
          <input
            type="text"
            placeholder="Ex: ETU001"
            value={newStudent.matricule}
            onChange={e => setNewStudent({ ...newStudent, matricule: e.target.value })}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="text-white mb-1 block">Genre *</label>
          <select
            value={newStudent.genre}
            onChange={e => setNewStudent({ ...newStudent, genre: e.target.value })}
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Sélectionner</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
        </div>

        {/* Date de naissance */}
        <div>
          <label className="text-white mb-1 block">Date de naissance *</label>
          <input
            type="date"
            value={newStudent.dateNaissance}
            onChange={e => setNewStudent({ ...newStudent, dateNaissance: e.target.value })}
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Lieu de naissance */}
        <div>
          <label className="text-white mb-1 block">Lieu de naissance</label>
          <input
            type="text"
            placeholder="Ex: Antananarivo"
            value={newStudent.lieuNaissance}
            onChange={e => setNewStudent({ ...newStudent, lieuNaissance: e.target.value })}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Adresse */}
        <div className="md:col-span-2">
          <label className="text-white mb-1 block">Adresse complète</label>
          <input
            type="text"
            placeholder="Ex: Lot IV ..."
            value={newStudent.adresse}
            onChange={e => setNewStudent({ ...newStudent, adresse: e.target.value })}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-white mb-1 block">Email *</label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Mail className="w-5 h-5 text-white/50 mr-2" />
            <input
              type="email"
              placeholder="email@example.com"
              value={newStudent.email}
              onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
              className="w-full bg-transparent text-white placeholder-white/40 outline-none"
            />
          </div>
        </div>

        {/* Téléphone */}
        <div>
          <label className="text-white mb-1 block">Téléphone *</label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Phone className="w-5 h-5 text-white/50 mr-2" />
            <input
              type="tel"
              placeholder="+261 ..."
              value={newStudent.telephone}
              onChange={e => setNewStudent({ ...newStudent, telephone: e.target.value })}
              className="w-full bg-transparent text-white placeholder-white/40 outline-none"
            />
          </div>
        </div>

        {/* Contact urgence */}
        <div>
          <label className="text-white mb-1 block">Nom contact d'urgence</label>
          <input
            type="text"
            value={newStudent.nomUrgence}
            onChange={e => setNewStudent({ ...newStudent, nomUrgence: e.target.value })}
            placeholder="Nom"
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 outline-none placeholder-white/40"
          />
        </div>

        <div>
          <label className="text-white mb-1 block">Téléphone d'urgence</label>
          <input
            type="tel"
            value={newStudent.telUrgence}
            onChange={e => setNewStudent({ ...newStudent, telUrgence: e.target.value })}
            placeholder="+261 ..."
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 outline-none placeholder-white/40"
          />
        </div>

        {/* Filière */}
        <div>
          <label className="text-white mb-1 block">Filière *</label>
          <select
            value={newStudent.filiere}
            onChange={e => setNewStudent({ ...newStudent, filiere: e.target.value })}
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Choisir une filière</option>
            {filieres.map(f => (
              <option key={f.id} value={f.nom}>{f.nom}</option>
            ))}
          </select>
        </div>

        {/* Niveau */}
        <div>
          <label className="text-white mb-1 block">Niveau *</label>
          <select
            value={newStudent.niveau}
            onChange={e => setNewStudent({ ...newStudent, niveau: e.target.value })}
            className="w-full bg-white/10 border border-white/20 text-black rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" >Choisir un niveau</option>
            <option value="L1">L1</option>
            <option value="L2">L2</option>
            <option value="L3">L3</option>
          </select>
        </div>

        {/* Année d'inscription */}
        <div>
          <label className="text-white mb-1 block">Année d’inscription</label>
          <input
            type="text"
            placeholder="2024"
            value={newStudent.anneeInscription}
            onChange={e => setNewStudent({ ...newStudent, anneeInscription: e.target.value })}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 text-white bg-white/10 hover:bg-white/20 rounded-lg transition"
        >
          Annuler
        </button>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Inscrire l'étudiant
        </button>
      </div>

      <p className="text-xs text-white/60 mt-2">* Champs obligatoires</p>
    </ReusableGlassModal>
  );
}
