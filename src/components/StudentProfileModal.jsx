import React from 'react';
import {
  X,
  QrCode,
  User,
  Phone,
  GraduationCap,
  Mail,
  BarChart
} from 'lucide-react';

export default function StudentProfileModal({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto p-6 animate-fadeInUp">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          <div className="flex flex-col items-center justify-center gap-6 text-center mx-auto w-full">

            {/* Photo */}
            <div className="w-40 h-40 bg-blue-100 border border-blue-200 rounded-full flex items-center justify-center text-4xl font-semibold text-blue-700 shadow-lg">
              {student.photoUrl ? (
                <img
                  src={student.photoUrl}
                  alt={student.prenom}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                `${student.prenom[0]}${student.nom[0]}`
              )}
            </div>

            {/* Nom */}
            <h2 className="text-2xl font-semibold text-black">
              {student.prenom} {student.nom}
            </h2>

            {/* QR */}
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-xl">
              <QrCode className="w-40 h-40 text-black" />
              <p className="mt-3 text-black font-semibold tracking-wide">
                {student.qrCode}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-2 flex flex-col gap-6">

            {/* Informations personnelles */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl shadow-md">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-lg text-blue-10">
                <User className="w-5 h-5 text-blue-200" />
                Informations personnelles
              </h3>

              <div className="grid grid-cols-2 gap-4 text-sm text-black font-semibold">
                <div><strong>Date de naissance:</strong> {student.dateNaissance}</div>
                <div><strong>Lieu de naissance:</strong> {student.lieuNaissance}</div>
                <div className="col-span-2"><strong>Adresse:</strong> {student.adresse}</div>
                <div><strong>Genre:</strong> {student.genre === 'M' ? 'Masculin' : 'Féminin'}</div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl shadow-md">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-lg text-black">
                <Phone className="w-5 h-5 text-black" />
                Contact
              </h3>

              <div className="grid grid-cols-2 gap-4 text-sm text-black font-semibold">
                <div><Mail className="inline w-4 h-4 mr-1" /> {student.email}</div>
                <div><Phone className="inline w-4 h-4 mr-1" /> {student.telephone}</div>

                <div className="col-span-2 font-semibold mt-2">Contact d'urgence :</div>
                <div>{student.nomUrgence}</div>
                <div>{student.telUrgence}</div>
              </div>
            </div>

            {/* Informations académiques */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl shadow-md">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-lg text-black">
                <GraduationCap className="w-5 h-5 text-black" />
                Informations académiques
              </h3>

              <div className="grid grid-cols-3 gap-4 text-sm text-black font-semibold">
                <div><strong>Filière :</strong><br /> {student.filiere}</div>
                <div><strong>Niveau :</strong><br /> {student.niveau}</div>
                <div><strong>Année d'inscription :</strong><br /> {student.anneeInscription}</div>
              </div>
            </div>

            {/* Statistiques de présence */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-lg shadow">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-lg text-black">
                <BarChart className="w-5 h-5 text-purple-600" />
                Statistiques de présence
              </h3>

              <div className="grid grid-cols-4 gap-4 text-center">

                <div className="bg-white/10 p-3 rounded-lg shadow-sm border">
                  <p className="text-2xl font-bold text-blue-600">
                    {student.tauxPresence || 85}%
                  </p>
                  <p className="text-xs text-gray-600">Taux global</p>
                </div>

                <div className="bg-white/10 p-3 rounded-lg shadow-sm border">
                  <p className="text-2xl font-bold text-green-600">
                    {student.presences || 42}
                  </p>
                  <p className="text-xs text-gray-600">Présences</p>
                </div>

                <div className="bg-white/10 p-3 rounded-lg shadow-sm border">
                  <p className="text-2xl font-bold text-red-600">
                    {student.absences || 7}
                  </p>
                  <p className="text-xs text-gray-600">Absences</p>
                </div>

                <div className="bg-white/10 p-3 rounded-lg shadow-sm border">
                  <p className="text-2xl font-bold text-orange-500">
                    {student.retards || 2}
                  </p>
                  <p className="text-xs text-gray-600">Retards</p>
                </div>

              </div>

              {/* Notification comportement */}
              <p className="mt-4 text-sm font-semibold text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
                {student.commentairePresence || "Excellent comportement !"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Fermer
              </button>

              <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-semibold flex items-center gap-1">
                <QrCode className="w-4 h-4" /> Télécharger QR
              </button>
            </div>

          </div>
        </div>
      </div>

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