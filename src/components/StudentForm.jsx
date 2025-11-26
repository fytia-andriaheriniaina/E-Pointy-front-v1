import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, GraduationCap, User, FileText } from 'lucide-react';

export default function StudentForm({ onClose, students, setStudents }) {
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
    genre: '',
    nomUrgence: '',
    telUrgence: '',
    photoUrl: null,
  });

  const handleAddStudent = () => {
    if (!newStudent.nom || !newStudent.prenom || !newStudent.matricule || !newStudent.email) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }
    setStudents([
      ...students,
      { ...newStudent, id: Date.now(), qrCode: `QR-${newStudent.matricule}` }
    ]);
    onClose();
  };

  const Input = ({ label, icon: Icon, type = "text", value, onChange, placeholder }) => (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-gray-700 text-sm">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border rounded-xl p-3 pl-${Icon ? "10" : "3"} bg-gray-50 focus:bg-white focus:border-blue-500 transition`}
        />
      </div>
    </div>
  );

  const Select = ({ label, value, onChange, children }) => (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-gray-700 text-sm">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl p-3 bg-gray-50 focus:bg-white focus:border-blue-500 transition"
      >
        {children}
      </select>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>

      {/* Popup */}
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto z-10 border">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Inscription d'un étudiant</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORMULAIRE EN UNE SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Nom */}
          <Input
            label="Nom *"
            icon={User}
            value={newStudent.nom}
            onChange={(e) => setNewStudent({ ...newStudent, nom: e.target.value })}
            placeholder="Ex : RAKOTO"
          />

          {/* Prénom */}
          <Input
            label="Prénom *"
            icon={User}
            value={newStudent.prenom}
            onChange={(e) => setNewStudent({ ...newStudent, prenom: e.target.value })}
            placeholder="Ex : Jean"
          />

          {/* Matricule */}
          <Input
            label="Matricule *"
            icon={FileText}
            value={newStudent.matricule}
            onChange={(e) => setNewStudent({ ...newStudent, matricule: e.target.value })}
            placeholder="Ex : 2025-0012"
          />

          {/* Genre */}
          <Select
            label="Genre"
            value={newStudent.genre}
            onChange={(e) => setNewStudent({ ...newStudent, genre: e.target.value })}
          >
            <option value="">Sélectionner…</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </Select>

          {/* Email */}
          <Input
            label="Email *"
            icon={Mail}
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            placeholder="exemple@gmail.com"
          />

          {/* Téléphone */}
          <Input
            label="Téléphone"
            icon={Phone}
            value={newStudent.telephone}
            onChange={(e) => setNewStudent({ ...newStudent, telephone: e.target.value })}
            placeholder="Ex : 034 xx xxx xx"
          />

          {/* Date naissance */}
          <Input
            label="Date de naissance"
            type="date"
            value={newStudent.dateNaissance}
            onChange={(e) => setNewStudent({ ...newStudent, dateNaissance: e.target.value })}
          />

          {/* Lieu naissance */}
          <Input
            label="Lieu de naissance"
            icon={MapPin}
            value={newStudent.lieuNaissance}
            onChange={(e) => setNewStudent({ ...newStudent, lieuNaissance: e.target.value })}
            placeholder="Ex : Antananarivo"
          />

          {/* Adresse */}
          <Input
            label="Adresse complète"
            icon={MapPin}
            value={newStudent.adresse}
            onChange={(e) => setNewStudent({ ...newStudent, adresse: e.target.value })}
            placeholder="Ex : Andoharanofotsy Lot I... "
          />

          {/* Filière */}
          <Select
            label="Filière"
            value={newStudent.filiere}
            onChange={(e) => setNewStudent({ ...newStudent, filiere: e.target.value })}
          >
            <option value="">Sélectionner…</option>
            <option value="Informatique">Informatique</option>
            <option value="Mathématiques">Mathématiques</option>
            <option value="Gestion">Gestion</option>
          </Select>

          {/* Niveau */}
          <Select
            label="Niveau"
            value={newStudent.niveau}
            onChange={(e) => setNewStudent({ ...newStudent, niveau: e.target.value })}
          >
            <option value="">Sélectionner…</option>
            <option value="L1">L1</option>
            <option value="L2">L2</option>
            <option value="L3">L3</option>
          </Select>

          {/* Année */}
          <Input
            label="Année d'inscription"
            icon={GraduationCap}
            value={newStudent.anneeInscription}
            onChange={(e) => setNewStudent({ ...newStudent, anneeInscription: e.target.value })}
            placeholder="Ex : 2024"
          />

          {/* Contact urgence */}
          <Input
            label="Personne à contacter (Nom)"
            value={newStudent.nomUrgence}
            onChange={(e) => setNewStudent({ ...newStudent, nomUrgence: e.target.value })}
            placeholder="Ex : RABE Ando"
          />

          <Input
            label="Tél. contact urgence"
            value={newStudent.telUrgence}
            onChange={(e) => setNewStudent({ ...newStudent, telUrgence: e.target.value })}
            placeholder="Ex : 033 xx xxx xx"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 p-3 bg-gray-200 rounded-xl hover:bg-gray-300 font-semibold"
          >
            Annuler
          </button>
          <button
            onClick={handleAddStudent}
            className="flex-1 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold"
          >
            Inscrire l'étudiant
          </button>
        </div>
      </div>
    </div>
  );
}
