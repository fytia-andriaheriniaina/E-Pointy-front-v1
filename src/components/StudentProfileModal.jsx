import React from 'react';
import { X, QrCode, User, Phone, MapPin, GraduationCap, Mail, BarChart } from 'lucide-react';

export default function StudentProfileModal({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      ></div>

      {/* Popup */}
      <div className="relative bg-white w-full max-w-5xl rounded-xl shadow-xl overflow-y-scroll scrollbar-none max-h-[95vh] z-10">
        

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* PHOTO + QR + NOM CENTRÉS */}
            <div className="flex flex-col items-center justify-center text-center gap-5">

              {/* Photo */}
              <div className="w-36 h-36 bg-gray-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600 shadow-md border">
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
              <h2 className="text-xl font-bold text-gray-800">
                {student.prenom} {student.nom}
              </h2>

              {/* QR Code */}
              <div className="bg-white p-6 rounded-xl shadow-md border text-center w-fit mx-auto">
                <QrCode className="w-40 h-40 mx-auto text-gray-600" />
                <p className="text-base font-medium mt-3 text-gray-700">
                  {student.qrCode}
                </p>
              </div>
            </div>


          {/* RIGHT SIDE SECTIONS */}
          <div className="md:col-span-2 flex flex-col gap-6">

            {/* Informations personnelles */}
            <div className="bg-gray-50 p-5 rounded-lg shadow">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-blue-600" />
                Informations personnelles
              </h3>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Date de naissance:</strong> {student.dateNaissance}</div>
                <div><strong>Lieu de naissance:</strong> {student.lieuNaissance}</div>
                <div className="col-span-2"><strong>Adresse:</strong> {student.adresse}</div>
                <div><strong>Genre:</strong> {student.genre === 'M' ? 'Masculin' : 'Féminin'}</div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 p-5 rounded-lg shadow">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-lg">
                <Phone className="w-5 h-5 text-blue-600" />
                Contact
              </h3>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><Mail className="inline w-4 h-4 mr-1" /> {student.email}</div>
                <div><Phone className="inline w-4 h-4 mr-1" /> {student.telephone}</div>

                <div className="col-span-2 font-medium mt-2">Contact d'urgence :</div>
                <div>{student.nomUrgence}</div>
                <div>{student.telUrgence}</div>
              </div>
            </div>

            {/* Informations académiques */}
            <div className="bg-gray-50 p-5 rounded-lg shadow">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-lg">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Informations académiques
              </h3>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Filière :</strong> <br /> {student.filiere || "Informatique"}
                </div>
                <div>
                  <strong>Niveau :</strong> <br /> {student.niveau || "L2"}
                </div>
                <div>
                  <strong>Année d'inscription :</strong> <br /> {student.anneeInscription || "2023"}
                </div>
              </div>
            </div>

            {/* Statistiques de présence */}
            <div className="bg-gray-50 p-5 rounded-lg shadow">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-lg">
                <BarChart className="w-5 h-5 text-purple-600" />
                Statistiques de présence
              </h3>

              <div className="grid grid-cols-4 gap-4 text-center">

                <div className="bg-white p-3 rounded-lg shadow-sm border">
                  <p className="text-2xl font-bold text-blue-600">
                    {student.tauxPresence || 85}%
                  </p>
                  <p className="text-xs text-gray-600">Taux global</p>
                </div>

                <div className="bg-white p-3 rounded-lg shadow-sm border">
                  <p className="text-2xl font-bold text-green-600">{student.presences || 42}</p>
                  <p className="text-xs text-gray-600">Présences</p>
                </div>

                <div className="bg-white p-3 rounded-lg shadow-sm border">
                  <p className="text-2xl font-bold text-red-600">{student.absences || 7}</p>
                  <p className="text-xs text-gray-600">Absences</p>
                </div>

                <div className="bg-white p-3 rounded-lg shadow-sm border">
                  <p className="text-2xl font-bold text-orange-500">{student.retards || 2}</p>
                  <p className="text-xs text-gray-600">Retards</p>
                </div>

              </div>

              <p className="mt-4 text-sm font-semibold text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
                {student.commentairePresence || "Excellent comportement !"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium"
              >
                Fermer
              </button>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-1">
                <QrCode className="w-4 h-4" /> Télécharger QR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
