import React from "react";
import {
  X,
  QrCode,
  User,
  Phone,
  GraduationCap,
  Mail,
  BarChart
} from "lucide-react";
import ReusableGlassModal from "./ReusableGlassModal";

export default function StudentProfileModal({ student, onClose }) {
  if (!student) return null;

  return (
    <ReusableGlassModal
      title="Profil étudiant"
      onClose={onClose}
      width="max-w-7xl"  // ← Changé de max-w-6xl à max-w-7xl pour plus de largeur
      className="overflow-hidden text-center"
    >

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">  {/* ← gap-5 → gap-4 */}

        {/* --- COLONNE 1 : profil centré --- */}
        <div className="flex flex-col items-center justify-center gap-6 text-center mx-auto w-full">  {/* ← gap-6 → gap-4 */}
        
          {/* Photo */}
          <div className="w-32 h-32 bg-blue-100 border border-blue-200 rounded-full flex items-center justify-center text-3xl font-semibold text-blue-700 shadow-lg">  {/* ← w-40 h-40 → w-32 h-32, text-4xl → text-3xl */}
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
          <h2 className="text-xl font-semibold text-black">  {/* ← text-2xl → text-xl */}
            {student.prenom} {student.nom}
          </h2>
        
          {/* QR */}
          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-xl">  {/* ← p-6 → p-4 */}
            <QrCode className="w-32 h-32 text-black" />  {/* ← w-40 h-40 → w-32 h-32 */}
            <p className="mt-2 text-black font-semibold tracking-wide text-sm">  {/* ← mt-3 → mt-2, ajout text-sm */}
              {student.qrCode}
            </p>
          </div>
        </div>

        {/* --- COLONNE 2 & 3 : infos --- */}
        <div className="md:col-span-2 flex flex-col gap-4 pr-4">  {/* ← gap-8 → gap-4, retiré overflow-y-auto */}

          {/* Informations personnelles */}
          <section className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md">  {/* ← p-5 → p-4 */}
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-base text-black">  {/* ← mb-3 text-lg → mb-2 text-base */}
              <User className="w-5 h-5 text-blue-600" />
              Informations personnelles
            </h3>

            <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-black">  {/* ← gap-4 → gap-3 */}
              <div><strong>Date :</strong> {student.dateNaissance}</div>
              <div><strong>Lieu :</strong> {student.lieuNaissance}</div>
              <div className="col-span-2"><strong>Adresse :</strong> {student.adresse}</div>
              <div><strong>Genre :</strong> {student.genre === "M" ? "Masculin" : "Féminin"}</div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md">  {/* ← p-5 → p-4 */}
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-base text-black">  {/* ← mb-3 text-lg → mb-2 text-base */}
              <Phone className="w-5 h-5 text-black" />
              Contact
            </h3>

            <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-black">  {/* ← gap-4 → gap-3 */}
              <div><Mail className="inline w-4 h-4 mr-1" /> {student.email}</div>
              <div><Phone className="inline w-4 h-4 mr-1" /> {student.telephone}</div>

              <div className="col-span-2 mt-1 font-semibold text-gray-800 text-xs">  {/* ← mt-2 → mt-1, ajout text-xs */}
                CONTACT D'URGENCE
              </div>
              <div>{student.nomUrgence}</div>
              <div>{student.telUrgence}</div>
            </div>
          </section>

          {/* Académique */}
          <section className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md">  {/* ← p-5 → p-4 */}
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-base text-black">  {/* ← mb-3 text-lg → mb-2 text-base */}
              <GraduationCap className="w-5 h-5 text-black" />
              Informations académiques
            </h3>

            <div className="grid grid-cols-3 gap-3 text-sm font-semibold text-black">  {/* ← gap-4 → gap-3 */}
              <div><strong>Filière :</strong><br />{student.filiere}</div>
              <div><strong>Niveau :</strong><br />{student.niveau}</div>
              <div><strong>Inscription :</strong><br />{student.anneeInscription}</div>
            </div>
          </section>

          {/* Stats */}
          <section className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md">  {/* ← p-5 → p-4 */}
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-base text-black">  {/* ← mb-3 text-lg → mb-2 text-base */}
              <BarChart className="w-5 h-5 text-purple-600" />
              Statistiques de présence
            </h3>

            <div className="grid grid-cols-4 gap-3 text-center">  {/* ← gap-4 → gap-3 */}
              {[
                { label: "Taux", value: student.tauxPresence || 85, color: "text-blue-600", suffix: "%" },
                { label: "Présences", value: student.presences || 42, color: "text-green-600" },
                { label: "Absences", value: student.absences || 7, color: "text-red-600" },
                { label: "Retards", value: student.retards || 2, color: "text-orange-500" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 p-3 rounded-xl shadow-md border">  {/* ← p-4 → p-3 */}
                  <p className={`text-2xl font-bold ${stat.color}`}>  {/* ← text-3xl → text-2xl */}
                    {stat.value}{stat.suffix || ""}
                  </p>
                  <p className="text-xs text-gray-700">{stat.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-3 text-sm font-semibold text-green-700 bg-green-50 p-2 rounded-lg border border-green-200">  {/* ← mt-4 p-3 → mt-3 p-2 */}
              {student.commentairePresence || "Excellent comportement !"}
            </p>
          </section>

          <div className="flex justify-center gap-3 mt-2">  {/* ← ajout mt-2 */}
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

    </ReusableGlassModal>
  );
}