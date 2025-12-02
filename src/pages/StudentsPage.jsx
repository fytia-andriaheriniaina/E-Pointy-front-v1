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
      // Mode édition
      setStudents(students.map(s => s.id === editingStudent.id ? { ...student, id: s.id, qrCode: s.qrCode } : s));
      setEditingStudent(null);
    } else {
      // Mode ajout
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

  // Filtrage des étudiants
  const filteredStudents = students.filter(s => {
    const matchSearch = s.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       s.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       s.matricule.toLowerCase().includes(searchQuery.toLowerCase());
    const matchNiveau = !filterNiveau || s.niveau === filterNiveau;
    return matchSearch && matchNiveau;
  });

  // Obtenir les niveaux uniques
  const niveaux = [...new Set(students.map(s => s.niveau))];

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Content */}
      <div className="relative z-10 h-screen overflow-y-auto p-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-500/30 p-3 rounded-xl border border-green-400/30">
                <Users className="w-7 h-7 text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-white">Gestion des étudiants</h1>
            </div>
            <p className="text-white/70 text-sm ml-14">
              {filteredStudents.length} étudiant{filteredStudents.length > 1 ? 's' : ''} {searchQuery || filterNiveau ? 'trouvé(s)' : 'au total'}
            </p>
          </div>

          <button
            onClick={() => {
              setEditingStudent(null);
              setShowFormModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Inscrire un étudiant
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl p-6 shadow-xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Rechercher
              </label>
              <div className="flex items-center border-2 border-blue-500/30 rounded-xl px-4 py-3 bg-white/10 backdrop-blur-sm focus-within:border-blue-400/60 transition-all hover:bg-white/15">
                <Search className="text-white/70 mr-3 flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="Nom, prénom ou matricule..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
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
                    className="ml-2 text-white/70 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Filter by niveau */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Filtrer par niveau
              </label>
              <div className="flex items-center border-2 border-blue-500/30 rounded-xl px-4 py-3 bg-white/10 backdrop-blur-sm focus-within:border-blue-400/60 transition-all hover:bg-white/15">
                <Filter className="text-white/70 mr-3 flex-shrink-0" size={20} />
                <select
                  value={filterNiveau}
                  onChange={(e) => setFilterNiveau(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none cursor-pointer appearance-none"
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
                <div className="text-white/70 pointer-events-none ml-2">▼</div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider">Prénom</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider">Matricule</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider">Niveau</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-semibold">{s.nom}</td>
                      <td className="px-6 py-4 text-white font-semibold">{s.prenom}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg border border-blue-400/30 font-mono text-sm">
                          {s.matricule}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/70 text-sm">{s.email}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center bg-purple-500/20 text-purple-300 px-3 py-1 rounded-lg border border-purple-400/30 text-sm font-semibold">
                          {s.niveau}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/70 text-sm">{s.telephone}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedStudent(s)}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg border border-blue-400/30 transition-all hover:scale-110 active:scale-95"
                            title="Voir profil"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditStudent(s)}
                            className="p-2 bg-white/10 hover:bg-white/20 text-white/90 rounded-lg border border-white/20 transition-all hover:scale-110 active:scale-95"
                            title="Modifier"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(s.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-400/30 transition-all hover:scale-110 active:scale-95"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="bg-white/10 p-4 rounded-full">
                          <Users className="w-12 h-12 text-white/50" />
                        </div>
                        <p className="text-white/70 text-lg">Aucun étudiant trouvé</p>
                        <p className="text-white/50 text-sm">
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
            <div className="border-t border-white/10 px-6 py-4 bg-white/5">
              <div className="flex items-center justify-between text-sm">
                <p className="text-white/70">
                  Affichage de <span className="font-semibold text-white">{filteredStudents.length}</span> étudiant{filteredStudents.length > 1 ? 's' : ''}
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