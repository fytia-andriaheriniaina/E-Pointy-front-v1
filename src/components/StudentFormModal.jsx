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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl w-full max-w-3xl p-6 shadow-lg z-10 overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 uppercase text-center">Inscrire un étudiant</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Informations personnelles */}
          <div>
            <label>Nom *</label>
            <input
              type="text"
              placeholder="Nom de famille"
              value={newStudent.nom}
              onChange={e => setNewStudent({ ...newStudent, nom: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label>Prénom *</label>
            <input
              type="text"
              placeholder="Prénom(s)"
              value={newStudent.prenom}
              onChange={e => setNewStudent({ ...newStudent, prenom: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label>Matricule *</label>
            <input
              type="text"
              placeholder="Ex: ETU001"
              value={newStudent.matricule}
              onChange={e => setNewStudent({ ...newStudent, matricule: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label>Genre *</label>
            <select
              value={newStudent.genre}
              onChange={e => setNewStudent({ ...newStudent, genre: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Sélectionner</option>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>

          <div>
            <label>Date de naissance *</label>
            <input
              type="date"
              value={newStudent.dateNaissance}
              onChange={e => setNewStudent({ ...newStudent, dateNaissance: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label>Lieu de naissance</label>
            <input
              type="text"
              placeholder="Ex: Antananarivo"
              value={newStudent.lieuNaissance}
              onChange={e => setNewStudent({ ...newStudent, lieuNaissance: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label>Adresse complète</label>
            <input
              type="text"
              placeholder="Ex: Lot IVA 23 Ambohipo, Antananarivo"
              value={newStudent.adresse}
              onChange={e => setNewStudent({ ...newStudent, adresse: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Contact */}
          <div>
            <label>Email *</label>
            <div className="flex items-center border rounded px-3 py-2">
              <Mail className="w-5 h-5 mr-2 text-gray-400" />
              <input
                type="email"
                placeholder="exemple@email.com"
                value={newStudent.email}
                onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
                className="w-full border-none focus:ring-0"
              />
            </div>
          </div>

          <div>
            <label>Téléphone *</label>
            <div className="flex items-center border rounded px-3 py-2">
              <Phone className="w-5 h-5 mr-2 text-gray-400" />
              <input
                type="tel"
                placeholder="+261 34 12 345 67"
                value={newStudent.telephone}
                onChange={e => setNewStudent({ ...newStudent, telephone: e.target.value })}
                className="w-full border-none focus:ring-0"
              />
            </div>
          </div>

          <div>
            <label>Contact d'urgence (Nom)</label>
            <input
              type="text"
              placeholder="Nom du contact"
              value={newStudent.nomUrgence}
              onChange={e => setNewStudent({ ...newStudent, nomUrgence: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label>Contact d'urgence (Tél)</label>
            <input
              type="tel"
              placeholder="+261 32 98 765 43"
              value={newStudent.telUrgence}
              onChange={e => setNewStudent({ ...newStudent, telUrgence: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Académique */}
          <div>
            <label>Filière *</label>
            <select
              value={newStudent.filiere}
              onChange={e => setNewStudent({ ...newStudent, filiere: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Sélectionner une filière</option>
              {filieres?.map(f => (
                <option key={f.id} value={f.nom}>{f.nom}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Niveau *</label>
            <select
              value={newStudent.niveau}
              onChange={e => setNewStudent({ ...newStudent, niveau: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Sélectionner un niveau</option>
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
            </select>
          </div>

          <div>
            <label>Année d'inscription</label>
            <input
              type="text"
              placeholder="Ex: 2024"
              value={newStudent.anneeInscription}
              onChange={e => setNewStudent({ ...newStudent, anneeInscription: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Inscrire l'étudiant
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">* Champs obligatoires</p>
      </div>
    </div>
  );
}
