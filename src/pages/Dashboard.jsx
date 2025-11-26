import { useState } from "react";
import { 
  Users, BookOpen, ClipboardList, BarChart3, TrendingUp, 
  AlertCircle, Calendar, CheckCircle, XCircle, Eye, Plus 
} from 'lucide-react';

import StudentFormModal from "../components/StudentFormModal";
import CourseFormModal from "../components/CourseFormModal";
import PresenceFormModal from "../components/PresenceFormModal";

export default function Dashboard({ students = [], courses = [], presences = [] }) {
  // Etats modals
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showPresenceModal, setShowPresenceModal] = useState(false);

  // Statistiques
  const totalPresents = presences.reduce((sum, p) => sum + (p.presents || 0), 0);
  const totalAbsents = presences.reduce((sum, p) => sum + (p.absents || 0), 0);
  const totalSessions = presences.reduce((sum, p) => sum + (p.total || 0), 0);
  const tauxPresence = totalSessions > 0 ? Math.round((totalPresents / totalSessions) * 100) : 0;

  // Répartition par filière
  const studentsByFiliere = students.reduce((acc, student) => {
    const f = student.filiere || 'Non renseigné';
    acc[f] = (acc[f] || 0) + 1;
    return acc;
  }, {});

  const lowAttendanceCount = 3; // mock

  return (
    <div className="h-screen overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden p-4">
      {/* POPUPS */}
      {showStudentModal && (
        <StudentFormModal onClose={() => setShowStudentModal(false)} />
      )}
      {showCourseModal && (
        <CourseFormModal onClose={() => setShowCourseModal(false)} />
      )}
      {showPresenceModal && (
        <PresenceFormModal onClose={() => setShowPresenceModal(false)} />
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 flex-col sm:flex-row">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble de votre établissement</p>
        </div>

        <button 
          onClick={() => setShowPresenceModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4 sm:mt-0"
        >
          <Plus className="w-5 h-5" />
          Nouvelle fiche de présence
        </button>
      </div>

      {/* STATISTICS (sans StatCard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {/* Étudiants */}
        <div className="bg-white shadow-lg p-6 rounded-xl flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Users className="text-blue-600 w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Étudiants inscrits</p>
            <p className="text-2xl font-bold">{students.length}</p>
          </div>
        </div>

        {/* Cours */}
        <div className="bg-white shadow-lg p-6 rounded-xl flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <BookOpen className="text-green-600 w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Cours actifs</p>
            <p className="text-2xl font-bold">{courses.length}</p>
          </div>
        </div>

        {/* Fiches présence */}
        <div className="bg-white shadow-lg p-6 rounded-xl flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <ClipboardList className="text-purple-600 w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Fiches de présence</p>
            <p className="text-2xl font-bold">{presences.length}</p>
          </div>
        </div>

        {/* Taux de présence */}
        <div className="bg-white shadow-lg p-6 rounded-xl flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-lg">
            <BarChart3 className="text-orange-600 w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Taux de présence moyen</p>
            <p className="text-2xl font-bold">{tauxPresence}%</p>
          </div>
        </div>
      </div>

      {/* ALERT */}
      {lowAttendanceCount > 0 && (
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6 rounded-r-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <div>
              <p className="font-semibold text-orange-800">
                Attention : {lowAttendanceCount} étudiant(s) à moins de 75%
              </p>
              <p className="text-sm text-orange-700">Cliquez ici pour voir les détails</p>
            </div>
          </div>
        </div>
      )}

      {/* REPARTITION + PRESENCE + ACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Répartition */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Répartition par filière
          </h3>

          <div className="space-y-3">
            {Object.entries(studentsByFiliere).map(([filiere, count]) => {
              const percentage = Math.round((count / (students.length || 1)) * 100);
              return (
                <div key={filiere}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{filiere}</span>
                    <span className="text-sm font-bold">{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: `${percentage}%`}} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistique présence */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            Présences ce mois
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" /> Présents
              </p>
              <p className="text-2xl font-bold text-green-600">{totalPresents}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" /> Absents
              </p>
              <p className="text-2xl font-bold text-red-600">{totalAbsents}</p>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>

          <div className="space-y-3">
            <button onClick={() => setShowPresenceModal(true)} className="w-full flex items-center gap-3 bg-white hover:bg-gray-50 p-3 rounded-lg">
              <div className="bg-blue-100 p-2 rounded"><Plus className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="font-medium">Créer une fiche</p>
                <p className="text-xs text-gray-600">Nouvelle fiche de présence</p>
              </div>
            </button>

            <button onClick={() => setShowStudentModal(true)} className="w-full flex items-center gap-3 bg-white hover:bg-gray-50 p-3 rounded-lg">
              <div className="bg-green-100 p-2 rounded"><Users className="w-5 h-5 text-green-600" /></div>
              <div>
                <p className="font-medium">Inscrire un étudiant</p>
                <p className="text-xs text-gray-600">Ajouter un nouvel étudiant</p>
              </div>
            </button>

            <button onClick={() => setShowCourseModal(true)} className="w-full flex items-center gap-3 bg-white hover:bg-gray-50 p-3 rounded-lg">
              <div className="bg-purple-100 p-2 rounded"><BookOpen className="w-5 h-5 text-purple-600" /></div>
              <div>
                <p className="font-medium">Créer un cours</p>
                <p className="text-xs text-gray-600">Nouveau cours</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Dernières présences */}
      <div className="bg-white rounded-lg shadow overflow-hidden p-6">
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Présences récentes</h2>
          </div>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
            Voir tout
            <Eye className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Horaire</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Présents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Absents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taux</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {presences.slice(0, 5).map((p) => {
                const taux = p.total ? Math.round((p.presents / p.total) * 100) : 0;
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4"><div className="font-medium text-gray-900">{p.coursNom}</div></td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.heureDebut} - {p.heureFin}</td>
                    <td className="px-6 py-4"><span className="inline-flex items-center gap-1 text-green-600 font-semibold"><CheckCircle className="w-4 h-4" />{p.presents}</span></td>
                    <td className="px-6 py-4"><span className="inline-flex items-center gap-1 text-red-600 font-semibold"><XCircle className="w-4 h-4" />{p.absents}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${taux >= 85 ? 'bg-green-500' : taux >= 70 ? 'bg-orange-500' : 'bg-red-500'}`} style={{width: `${taux}%`}} />
                        </div>
                        <span className={`text-sm font-medium ${taux >= 85 ? 'text-green-600' : taux >= 70 ? 'text-orange-600' : 'text-red-600'}`}>{taux}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONTENU POUR TESTER LE SCROLL */}
      <div className="mt-8 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded shadow">
            <p>Contenu factice supplémentaire #{i + 1}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="text-center">
          <p className="text-sm">© {new Date().getFullYear()} Mon Établissement. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
