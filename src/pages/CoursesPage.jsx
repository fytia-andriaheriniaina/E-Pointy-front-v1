import { useState } from 'react';
import { Plus, Search, BookOpen, Edit2, Trash2, Eye, Users, Clock, GraduationCap } from 'lucide-react';
import ReusableGlassModal from '../components/ReusableGlassModal';
import CourseFormModal from '../components/CourseFormModal';

export default function CoursesPage({ courses, setCourses, students }) {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSemestre, setFilterSemestre] = useState('all');

  // Filtrage des cours
  const filteredCourses = courses.filter(c => {
    const matchSearch = c.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       c.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       c.enseignant?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSemestre = filterSemestre === 'all' || c.semestre === filterSemestre;
    return matchSearch && matchSemestre;
  });

  // Liste des semestres uniques
  const semestres = [...new Set(courses.map(c => c.semestre).filter(Boolean))];

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  const handleDeleteCourse = (courseId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      setCourses(courses.filter(c => c.id !== courseId));
    }
  };

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setShowDetailModal(true);
  };

  // Calcul du nombre d'étudiants par cours
  const getStudentCount = (course) => {
    if (!students) return 0;
    return students.filter(s => s.niveau === course.niveau && s.filiere === course.filiere).length;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Popup d'ajout/modification */}
      {showModal && (
        <CourseFormModal 
          onClose={() => {
            setShowModal(false);
            setEditingCourse(null);
          }}
          editingCourse={editingCourse}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-screen overflow-y-auto p-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-500/30 p-3 rounded-xl border border-blue-400/30">
                <BookOpen className="w-7 h-7 text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-white">Gestion des Cours</h1>
            </div>
            <p className="text-white/70 text-sm ml-14">
              {filteredCourses.length} cours {searchTerm || filterSemestre !== 'all' ? 'trouvé(s)' : 'au total'}
            </p>
          </div>

          <button
            onClick={() => {
              setEditingCourse(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-purple-500/30 border-purple-400/50 text-purple-300 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" /> Créer un cours
          </button>
        </div>

        {/* Recherche et filtres */}
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl p-6 shadow-xl mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Rechercher
              </label>
              <div className="flex items-center border-2 border-blue-500/30 rounded-xl px-4 py-3 bg-white/10 backdrop-blur-sm focus-within:border-blue-400/60 transition-all hover:bg-white/15">
                <Search className="text-white/70 mr-3 flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="Nom, code ou enseignant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
                  autoComplete="off"
                  style={{ 
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white',
                    caretColor: 'white'
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 text-white/70 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Filter by semestre */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Filtrer par semestre
              </label>
              <div className="flex items-center border-2 border-blue-500/30 rounded-xl px-4 py-3 bg-white/10 backdrop-blur-sm focus-within:border-blue-400/60 transition-all hover:bg-white/15">
                <BookOpen className="text-white/70 mr-3 flex-shrink-0" size={20} />
                <select
                  value={filterSemestre}
                  onChange={(e) => setFilterSemestre(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none cursor-pointer appearance-none"
                  style={{ 
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white'
                  }}
                >
                  <option value="all" className="bg-slate-800">Tous les semestres</option>
                  {semestres.map(s => (
                    <option key={s} value={s} className="bg-slate-800">{s}</option>
                  ))}
                </select>
                <div className="text-white/70 pointer-events-none ml-2">▼</div>
              </div>
            </div>
          </div>
        </div>

        {/* Affichage en grille de cartes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden group hover:scale-[1.02] duration-300"
            >
              {/* Header de la carte avec gradient bleu */}
              <div className="bg-purple-500/30 to-purple-600 p-5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                      {course.code}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                      {course.semestre}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.nom}</h3>
                  <p className="text-blue-100 text-sm flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.enseignant}
                  </p>
                </div>
              </div>

              {/* Corps de la carte */}
              <div className="p-5">
                <div className="space-y-3 mb-4">
                  {course.filiere && (
                    <div className="flex items-center gap-2 text-sm text-white/90 bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                      <GraduationCap className="w-4 h-4 text-blue-400" />
                      <span className="font-medium">{course.filiere} - {course.niveau}</span>
                    </div>
                  )}
                  {course.volumeHoraire && (
                    <div className="flex items-center gap-2 text-sm text-white/90 bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="font-medium">{course.volumeHoraire}h de cours</span>
                    </div>
                  )}
                  {course.credits && (
                    <div className="flex items-center gap-2 text-sm text-white/90 bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                      <BookOpen className="w-4 h-4 text-orange-400" />
                      <span className="font-medium">{course.credits} crédits ECTS</span>
                    </div>
                  )}
                  
                  {/* Nombre d'étudiants */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-300 bg-blue-500/20 backdrop-blur-sm p-3 rounded-lg border border-blue-400/30">
                    <Users className="w-4 h-4" />
                    <span>{getStudentCount(course)} étudiants inscrits</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-white/20">
                  <button
                    onClick={() => handleViewDetails(course)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 rounded-lg hover:bg-blue-500/30 border border-blue-400/30 transition-all text-sm font-medium hover:scale-105"
                    title="Voir détails"
                  >
                    <Eye className="w-4 h-4" />
                    Détails
                  </button>
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white/10 backdrop-blur-sm text-white/90 rounded-lg hover:bg-white/20 border border-white/20 transition-all text-sm font-medium hover:scale-105"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4" />
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="px-3 py-2 bg-red-500/20 backdrop-blur-sm text-red-300 rounded-lg hover:bg-red-500/30 border border-red-400/30 transition-all hover:scale-105"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun cours */}
        {filteredCourses.length === 0 && (
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl shadow-xl p-12 text-center">
            <div className="bg-white/10 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-white/50" />
            </div>
            <p className="text-white/90 text-xl font-semibold">Aucun cours trouvé</p>
            <p className="text-white/60 text-sm mt-2">
              {searchTerm || filterSemestre !== 'all' 
                ? 'Essayez de modifier vos critères de recherche' 
                : 'Commencez par créer votre premier cours'}
            </p>
          </div>
        )}

        {/* Table footer pagination si nécessaire */}
        {filteredCourses.length > 0 && (
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl shadow-xl px-6 py-4 mt-6">
            <div className="flex items-center justify-between text-sm">
              <p className="text-white/70">
                Affichage de <span className="font-semibold text-white">{filteredCourses.length}</span> cours
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-blue-500/30 transition-all">
                  Précédent
                </button>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-blue-500/30 transition-all">
                  Suivant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal détails du cours */}
      {showDetailModal && selectedCourse && (
        <ReusableGlassModal 
          title={selectedCourse.nom}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedCourse(null);
          }}
          width="max-w-2xl"
        >
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold border border-blue-400/30">
                {selectedCourse.code}
              </span>
              <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold border border-purple-400/30">
                {selectedCourse.semestre}
              </span>
            </div>

            {/* Informations en grille */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl">
                <p className="text-xs text-white/60 mb-1 font-medium">Enseignant</p>
                <p className="font-semibold text-white">{selectedCourse.enseignant}</p>
              </div>
              {selectedCourse.filiere && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl">
                  <p className="text-xs text-white/60 mb-1 font-medium">Filière / Niveau</p>
                  <p className="font-semibold text-white">{selectedCourse.filiere} - {selectedCourse.niveau}</p>
                </div>
              )}
              {selectedCourse.credits && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl">
                  <p className="text-xs text-white/60 mb-1 font-medium">Crédits ECTS</p>
                  <p className="font-semibold text-white">{selectedCourse.credits}</p>
                </div>
              )}
              {selectedCourse.volumeHoraire && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl">
                  <p className="text-xs text-white/60 mb-1 font-medium">Volume horaire</p>
                  <p className="font-semibold text-white">{selectedCourse.volumeHoraire}h</p>
                </div>
              )}
              <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 p-4 rounded-xl md:col-span-2">
                <p className="text-xs text-blue-300 mb-1 font-medium">Étudiants inscrits</p>
                <p className="font-bold text-2xl text-blue-300">{getStudentCount(selectedCourse)}</p>
              </div>
            </div>

            {selectedCourse.description && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl">
                <p className="text-xs text-white/60 mb-2 font-medium">Description</p>
                <p className="text-white/90">{selectedCourse.description}</p>
              </div>
            )}

            {/* Boutons d'action */}
            <div className="flex gap-3 pt-4 border-t border-white/20">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  handleEditCourse(selectedCourse);
                }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl transition-all font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <Edit2 className="w-4 h-4" />
                Modifier le cours
              </button>
            </div>
          </div>
        </ReusableGlassModal>
      )}
    </div>
  );
}