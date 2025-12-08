import { useState } from 'react';
import { Plus, Eye, Users, Search, Filter, Edit2, Trash2 } from 'lucide-react';
import StudentFormModal from '../components/StudentFormModal';
import StudentProfileModal from '../components/StudentProfileModal';

export default function StudentsPage({ students, setStudents, filieres }) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterNiveau, setFilterNiveau] = useState('');

  const handleAddStudent = (student) => {
    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? { ...student, id: s.id, qrCode: s.qrCode } : s));
      setEditingStudent(null);
    } else {
      setStudents([...students, { ...student, id: Date.now(), qrCode: 'QR-' + student.matricule }]);
    }
    setShowFormModal(false);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowFormModal(true);
  };

  const handleDeleteStudent = (studentId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      setStudents(students.filter(s => s.id !== studentId));
    }
  };

  const filteredStudents = students.filter(s => {
    const matchSearch = s.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       s.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       s.matricule.toLowerCase().includes(searchQuery.toLowerCase());
    const matchNiveau = !filterNiveau || s.niveau === filterNiveau;
    return matchSearch && matchNiveau;
  });

  const niveaux = [...new Set(students.map(s => s.niveau))];

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      <div className="relative z-10 h-screen overflow-y-auto p-3 sm:p-4 lg:p-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl w-full lg:w-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <div className="bg-green-500/30 p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl border border-green-400/30">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-green-400" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Gestion des étudiants</h1>
            </div>
            <p className="text-white/70 text-xs sm:text-sm ml-9 sm:ml-11 lg:ml-14">
              {filteredStudents.length} étudiant{filteredStudents.length > 1 ? 's' : ''} {searchQuery || filterNiveau ? 'trouvé(s)' : 'au total'}
            </p>
          </div>

          <button
            onClick={() => {
              setEditingStudent(null);
              setShowFormModal(true);
            }}
            className="w-full lg:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Inscrire un étudiant</span>
            <span className="sm:hidden">Inscrire</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl mb-4 sm:mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            
            {/* Search */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-1.5 sm:mb-2">
                Rechercher
              </label>
              <div className="flex items-center border-2 border-blue-500/30 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 bg-white/10 backdrop-blur-sm focus-within:border-blue-400/60 transition-all hover:bg-white/15">
                <Search className="text-white/70 mr-2 sm:mr-3 flex-shrink-0" size={18} />
                <input
                  type="text"
                  placeholder="Nom, prénom ou matricule..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm sm:text-base"
                  autoComplete="off"
                  style={{ 
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white',
                    caretColor: 'white'
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-2 text-white/70 hover:text-white text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Filter by niveau */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-1.5 sm:mb-2">
                Filtrer par niveau
              </label>
              <div className="flex items-center border-2 border-blue-500/30 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 bg-white/10 backdrop-blur-sm focus-within:border-blue-400/60 transition-all hover:bg-white/15">
                <Filter className="text-white/70 mr-2 sm:mr-3 flex-shrink-0" size={18} />
                <select
                  value={filterNiveau}
                  onChange={(e) => setFilterNiveau(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none cursor-pointer appearance-none text-sm sm:text-base"
                  style={{ 
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white'
                  }}
                >
                  <option value="" className="bg-slate-800">Tous les niveaux</option>
                  {niveaux.map(niveau => (
                    <option key={niveau} value={niveau} className="bg-slate-800">
                      {niveau}
                    </option>
                  ))}
                </select>
                <div className="text-white/70 pointer-events-none ml-2 text-sm">▼</div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider">Nom & Prénom</th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider hidden lg:table-cell">Matricule</th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider hidden md:table-cell">Email</th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider hidden lg:table-cell">Niveau</th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider hidden xl:table-cell">Contact</th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <div className="font-semibold text-white text-sm sm:text-base">{s.nom} {s.prenom}</div>
                        <div className="text-white/60 text-xs mt-0.5 md:hidden">{s.email}</div>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center hidden lg:table-cell">
                        <span className="inline-flex items-center bg-blue-500/20 text-blue-300 px-2 sm:px-3 py-1 rounded-lg border border-blue-400/30 font-mono text-xs sm:text-sm">
                          {s.matricule}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-white/70 text-xs sm:text-sm hidden md:table-cell">{s.email}</td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center hidden lg:table-cell">
                        <span className="inline-flex items-center bg-purple-500/20 text-purple-300 px-2 sm:px-3 py-1 rounded-lg border border-purple-400/30 text-xs sm:text-sm font-semibold">
                          {s.niveau}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-white/70 text-xs sm:text-sm hidden xl:table-cell">{s.telephone}</td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                          <button
                            onClick={() => setSelectedStudent(s)}
                            className="p-1.5 sm:p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg border border-blue-400/30 transition-all hover:scale-110 active:scale-95"
                            title="Voir profil"
                          >
                            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => handleEditStudent(s)}
                            className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 text-white/90 rounded-lg border border-white/20 transition-all hover:scale-110 active:scale-95"
                            title="Modifier"
                          >
                            <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(s.id)}
                            className="p-1.5 sm:p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-400/30 transition-all hover:scale-110 active:scale-95"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-3 sm:px-6 py-8 sm:py-12 text-center">
                      <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <div className="bg-white/10 p-3 sm:p-4 rounded-full">
                          <Users className="w-10 h-10 sm:w-12 sm:h-12 text-white/50" />
                        </div>
                        <p className="text-white/70 text-base sm:text-lg">Aucun étudiant trouvé</p>
                        <p className="text-white/50 text-xs sm:text-sm px-4">
                          {searchQuery || filterNiveau 
                            ? 'Essayez de modifier vos critères de recherche' 
                            : 'Commencez par inscrire votre premier étudiant'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          {filteredStudents.length > 0 && (
            <div className="border-t border-white/10 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 bg-white/5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
                <p className="text-white/70 text-center sm:text-left">
                  Affichage de <span className="font-semibold text-white">{filteredStudents.length}</span> étudiant{filteredStudents.length > 1 ? 's' : ''}
                </p>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-blue-500/30 transition-all text-xs sm:text-sm">
                    Précédent
                  </button>
                  <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-blue-500/30 transition-all text-xs sm:text-sm">
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showFormModal && (
        <StudentFormModal
          filieres={filieres}
          onClose={() => {
            setShowFormModal(false);
            setEditingStudent(null);
          }}
          onAdd={handleAddStudent}
          editingStudent={editingStudent}
        />
      )}

      {selectedStudent && (
        <StudentProfileModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
   </div>
  );
}