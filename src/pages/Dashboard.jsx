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
      <div className="relative z-10 h-screen overflow-y-auto p-3 sm:p-4 lg:p-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      
      {/* Overlay decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 h-screen overflow-y-auto p-3 sm:p-4 lg:p-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        
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
        <div className="flex justify-between items-start lg:items-center mb-4 sm:mb-6 lg:mb-8 flex-col lg:flex-row gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl w-full lg:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Tableau de bord</h1>
            <p className="text-sm sm:text-base text-white/70">Vue d'ensemble de votre établissement</p>
          </div>

          <button 
            onClick={() => setShowPresenceModal(true)}
            className="w-full lg:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Nouvelle fiche de présence</span>
            <span className="sm:hidden">Nouvelle fiche</span>
          </button>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          {/* Étudiants */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl hover:scale-105 transition-transform">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="bg-blue-500/20 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border border-blue-400/30">
                <Users className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-white/70 font-medium">Étudiants</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{students.length}</p>
              </div>
            </div>
          </div>

          {/* Cours */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl hover:scale-105 transition-transform">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="bg-green-500/20 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border border-green-400/30">
                <BookOpen className="text-green-400 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-white/70 font-medium">Cours actifs</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{courses.length}</p>
              </div>
            </div>
          </div>

          {/* Fiches présence */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl hover:scale-105 transition-transform">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="bg-purple-500/20 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border border-purple-400/30">
                <ClipboardList className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-white/70 font-medium">Fiches</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{presences.length}</p>
              </div>
            </div>
          </div>

          {/* Taux de présence */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl hover:scale-105 transition-transform">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="bg-orange-500/20 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border border-orange-400/30">
                <BarChart3 className="text-orange-400 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-white/70 font-medium">Taux moyen</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{tauxPresence}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* ALERT */}
        {lowAttendanceCount > 0 && (
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/10 backdrop-blur-xl border-2 border-orange-400/30 p-3 sm:p-4 lg:p-5 mb-4 sm:mb-6 lg:mb-8 rounded-xl sm:rounded-2xl shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="bg-orange-500/30 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-orange-300" />
              </div>
              <div>
                <p className="font-bold text-orange-200 text-sm sm:text-base lg:text-lg">
                  Attention : {lowAttendanceCount} étudiant(s) à moins de 75%
                </p>
                <p className="text-xs sm:text-sm text-orange-300/80">Cliquez ici pour voir les détails</p>
              </div>
            </div>
          </div>
        )}

        {/* REPARTITION + PRESENCE + ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          
          {/* Répartition */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              <span className="truncate">Répartition par filière</span>
            </h3>

            <div className="space-y-3 sm:space-y-4">
              {Object.entries(studentsByFiliere).map(([filiere, count]) => {
                const percentage = Math.round((count / (students.length || 1)) * 100);
                return (
                  <div key={filiere}>
                    <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                      <span className="text-xs sm:text-sm text-white/80 truncate pr-2">{filiere}</span>
                      <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 sm:h-2.5 border border-blue-500/30">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 sm:h-2.5 rounded-full transition-all duration-500" 
                        style={{width: `${percentage}%`}} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Statistique présence */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              <span className="truncate">Présences ce mois</span>
            </h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-xs sm:text-sm text-white/80 flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" /> 
                  <span>Présents</span>
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-green-400">{totalPresents}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-xs sm:text-sm text-white/80 flex items-center gap-1.5 sm:gap-2">
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" /> 
                  <span>Absents</span>
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-red-400">{totalAbsents}</p>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Actions rapides</h3>

            <div className="space-y-2 sm:space-y-3">
              <button 
                onClick={() => setShowPresenceModal(true)} 
                className="w-full flex items-center gap-2 sm:gap-3 bg-white/10 hover:bg-white/20 border border-blue-500/30 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <div className="bg-blue-500/30 p-1.5 sm:p-2 rounded-lg border border-blue-400/30 flex-shrink-0">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white text-sm sm:text-base">Créer une fiche</p>
                  <p className="text-xs text-white/60 hidden sm:block">Nouvelle fiche de présence</p>
                </div>
              </button>

              <button 
                onClick={() => setShowStudentModal(true)} 
                className="w-full flex items-center gap-2 sm:gap-3 bg-white/10 hover:bg-white/20 border border-blue-500/30 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <div className="bg-green-500/30 p-1.5 sm:p-2 rounded-lg border border-green-400/30 flex-shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white text-sm sm:text-base">Inscrire un étudiant</p>
                  <p className="text-xs text-white/60 hidden sm:block">Ajouter un nouvel étudiant</p>
                </div>
              </button>

              <button 
                onClick={() => setShowCourseModal(true)} 
                className="w-full flex items-center gap-2 sm:gap-3 bg-white/10 hover:bg-white/20 border border-blue-500/30 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <div className="bg-purple-500/30 p-1.5 sm:p-2 rounded-lg border border-purple-400/30 flex-shrink-0">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white text-sm sm:text-base">Créer un cours</p>
                  <p className="text-xs text-white/60 hidden sm:block">Nouveau cours</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Dernières présences */}
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden mb-4 sm:mb-6 lg:mb-8">
          <div className="p-4 sm:p-5 lg:p-6 border-b border-blue-500/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Présences récentes</h2>
            </div>
            <button className="w-full sm:w-auto text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 bg-blue-500/20 px-3 sm:px-4 py-2 rounded-lg border border-blue-400/30 transition-all hover:scale-105">
              <span>Voir tout</span>
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-blue-500/30">
                <tr>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider">Cours</th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider hidden lg:table-cell">Horaire</th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider">Présents</th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider">Absents</th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider hidden sm:table-cell">Taux</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {presences.slice(0, 5).map((p) => {
                  const taux = p.total ? Math.round((p.presents / p.total) * 100) : 0;
                  return (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <div className="font-semibold text-white text-xs sm:text-sm">{p.coursNom}</div>
                        <div className="text-xs text-white/60 md:hidden mt-1">{p.date}</div>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-white/70 hidden md:table-cell">{p.date}</td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-white/70 hidden lg:table-cell">{p.heureDebut} - {p.heureFin}</td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                        <span className="inline-flex items-center gap-1 sm:gap-2 text-green-400 font-semibold bg-green-500/20 px-2 sm:px-3 py-1 rounded-lg border border-green-400/30 text-xs sm:text-sm">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />{p.presents}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                        <span className="inline-flex items-center gap-1 sm:gap-2 text-red-400 font-semibold bg-red-500/20 px-2 sm:px-3 py-1 rounded-lg border border-red-400/30 text-xs sm:text-sm">
                          <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />{p.absents}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 hidden sm:table-cell">
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                          <div className="w-16 sm:w-20 bg-white/10 rounded-full h-2 sm:h-2.5 border border-blue-500/30">
                            <div 
                              className={`h-2 sm:h-2.5 rounded-full ${taux >= 85 ? 'bg-green-500' : taux >= 70 ? 'bg-orange-500' : 'bg-red-500'}`} 
                              style={{width: `${taux}%`}} 
                            />
                          </div>
                          <span className={`text-xs sm:text-sm font-bold whitespace-nowrap ${taux >= 85 ? 'text-green-400' : taux >= 70 ? 'text-orange-400' : 'text-red-400'}`}>
                            {taux}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl text-center">
          <p className="text-xs sm:text-sm text-white/70">© {new Date().getFullYear()} E-Poionty. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
  );
}