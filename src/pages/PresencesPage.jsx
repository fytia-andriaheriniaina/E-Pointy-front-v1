import { useState } from 'react';
import { Plus, Search, ClipboardList, Eye, Edit2, Trash2, CheckCircle, XCircle, Calendar, Clock, Filter } from 'lucide-react';
import PresenceFormModal from '../components/PresenceFormModal';
import ReusableGlassModal from '../components/ReusableGlassModal';

export default function PresencesPage({ presences, setPresences, courses, students }) {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPresence, setSelectedPresence] = useState(null);
  const [editingPresence, setEditingPresence] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterCours, setFilterCours] = useState('all');

  // Filtrage des présences
  const filteredPresences = presences.filter(p => {
    const matchSearch = p.coursNom?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDate = !filterDate || p.date === filterDate;
    const matchCours = filterCours === 'all' || p.coursId === parseInt(filterCours);
    return matchSearch && matchDate && matchCours;
  });

  const handleEditPresence = (presence) => {
    setEditingPresence(presence);
    setShowModal(true);
  };

  const handleDeletePresence = (presenceId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette fiche de présence ?')) {
      setPresences(presences.filter(p => p.id !== presenceId));
    }
  };

  const handleViewDetails = (presence) => {
    setSelectedPresence(presence);
    setShowDetailModal(true);
  };

  // Calcul du taux de présence
  const getTauxPresence = (presence) => {
    if (presence.total === 0) return 0;
    return Math.round((presence.presents / presence.total) * 100);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Popup d'ajout/modification */}
      {showModal && (
        <PresenceFormModal 
          onClose={() => {
            setShowModal(false);
            setEditingPresence(null);
          }}
          editingPresence={editingPresence}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-screen overflow-y-auto p-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-500/30 p-3 rounded-xl border border-purple-400/30">
                <ClipboardList className="w-7 h-7 text-purple-400" />
              </div>
              <h1 className="text-3xl font-bold text-white">Fiches de Présence</h1>
            </div>
            <p className="text-white/70 text-sm ml-14">
              {filteredPresences.length} fiche{filteredPresences.length > 1 ? 's' : ''} {searchTerm || filterDate || filterCours !== 'all' ? 'trouvée(s)' : 'au total'}
            </p>
          </div>

          <button
            onClick={() => {
              setEditingPresence(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" /> Créer une fiche
          </button>
        </div>

        {/* Recherche et filtres */}
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl p-6 shadow-xl mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Rechercher par cours
              </label>
              <div className="flex items-center border-2 border-blue-500/30 rounded-xl px-4 py-3 bg-white/10 backdrop-blur-sm focus-within:border-blue-400/60 transition-all hover:bg-white/15">
                <Search className="text-white/70 mr-3 flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="Nom du cours..."
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

            {/* Filter by date */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Filtrer par date
              </label>
              <div className="flex items-center border-2 border-blue-500/30 rounded-xl px-4 py-3 bg-white/10 backdrop-blur-sm focus-within:border-blue-400/60 transition-all hover:bg-white/15">
                <Calendar className="text-white/70 mr-3 flex-shrink-0" size={20} />
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none cursor-pointer"
                  style={{ 
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white',
                    colorScheme: 'dark'
                  }}
                />
                {filterDate && (
                  <button
                    onClick={() => setFilterDate('')}
                    className="ml-2 text-white/70 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Filter by cours */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Filtrer par cours
              </label>
              <div className="flex items-center border-2 border-blue-500/30 rounded-xl px-4 py-3 bg-white/10 backdrop-blur-sm focus-within:border-blue-400/60 transition-all hover:bg-white/15">
                <Filter className="text-white/70 mr-3 flex-shrink-0" size={20} />
                <select
                  value={filterCours}
                  onChange={(e) => setFilterCours(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none cursor-pointer appearance-none"
                  style={{ 
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white'
                  }}
                >
                  <option value="all" className="bg-slate-800">Tous les cours</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id} className="bg-slate-800">
                      {c.nom}
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
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider">Cours</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider">Horaire</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider">Présents</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider">Absents</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider">Taux</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredPresences.length > 0 ? (
                  filteredPresences.map((p) => {
                    const taux = getTauxPresence(p);
                    return (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <ClipboardList className="w-4 h-4 text-purple-400" />
                            <span className="text-white font-semibold">{p.coursNom}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg border border-blue-400/30 text-sm">
                            <Calendar className="w-3 h-3" />
                            {p.date}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1 text-white/70 text-sm">
                            <Clock className="w-3 h-3" />
                            {p.heureDebut} - {p.heureFin}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-lg border border-green-400/30 font-semibold text-sm">
                            <CheckCircle className="w-4 h-4" />
                            {p.presents}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1 bg-red-500/20 text-red-300 px-3 py-1 rounded-lg border border-red-400/30 font-semibold text-sm">
                            <XCircle className="w-4 h-4" />
                            {p.absents}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-24 bg-white/20 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  taux >= 75 ? 'bg-green-500' : 
                                  taux >= 50 ? 'bg-orange-500' : 
                                  'bg-red-500'
                                }`}
                                style={{width: `${taux}%`}}
                              ></div>
                            </div>
                            <span className={`text-sm font-bold ${
                              taux >= 75 ? 'text-green-400' : 
                              taux >= 50 ? 'text-orange-400' : 
                              'text-red-400'
                            }`}>
                              {taux}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleViewDetails(p)}
                              className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg border border-blue-400/30 transition-all hover:scale-110 active:scale-95"
                              title="Voir détails"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditPresence(p)}
                              className="p-2 bg-white/10 hover:bg-white/20 text-white/90 rounded-lg border border-white/20 transition-all hover:scale-110 active:scale-95"
                              title="Modifier"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePresence(p.id)}
                              className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-400/30 transition-all hover:scale-110 active:scale-95"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="bg-white/10 p-4 rounded-full">
                          <ClipboardList className="w-12 h-12 text-white/50" />
                        </div>
                        <p className="text-white/70 text-lg">Aucune fiche de présence trouvée</p>
                        <p className="text-white/50 text-sm">
                          {searchTerm || filterDate || filterCours !== 'all'
                            ? 'Essayez de modifier vos critères de recherche' 
                            : 'Commencez par créer votre première fiche de présence'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          {filteredPresences.length > 0 && (
            <div className="border-t border-white/10 px-6 py-4 bg-white/5">
              <div className="flex items-center justify-between text-sm">
                <p className="text-white/70">
                  Affichage de <span className="font-semibold text-white">{filteredPresences.length}</span> fiche{filteredPresences.length > 1 ? 's' : ''}
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

      {/* Modal détails de la présence */}
      {showDetailModal && selectedPresence && (
        <ReusableGlassModal 
          title={`Présence - ${selectedPresence.coursNom}`}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedPresence(null);
          }}
          width="max-w-3xl"
        >
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold border border-blue-400/30 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {selectedPresence.date}
              </span>
              <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold border border-purple-400/30 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedPresence.heureDebut} - {selectedPresence.heureFin}
              </span>
            </div>

            {/* Statistiques */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-xl text-center">
                <p className="text-xs text-white/60 mb-2 font-medium">Total étudiants</p>
                <p className="text-3xl font-bold text-white">{selectedPresence.total}</p>
              </div>
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 p-5 rounded-xl text-center">
                <p className="text-xs text-green-300 mb-2 font-medium">Présents</p>
                <p className="text-3xl font-bold text-green-300">{selectedPresence.presents}</p>
              </div>
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 p-5 rounded-xl text-center">
                <p className="text-xs text-red-300 mb-2 font-medium">Absents</p>
                <p className="text-3xl font-bold text-red-300">{selectedPresence.absents}</p>
              </div>
              <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 p-5 rounded-xl text-center">
                <p className="text-xs text-blue-300 mb-2 font-medium">Taux de présence</p>
                <p className="text-3xl font-bold text-blue-300">{getTauxPresence(selectedPresence)}%</p>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-xl">
              <p className="text-sm font-semibold text-white/90 mb-3">Répartition</p>
              <div className="flex h-4 rounded-full overflow-hidden">
                <div 
                  className="bg-green-500 flex items-center justify-center text-xs text-white font-semibold"
                  style={{width: `${(selectedPresence.presents / selectedPresence.total) * 100}%`}}
                >
                  {selectedPresence.presents > 0 && selectedPresence.presents}
                </div>
                <div 
                  className="bg-red-500 flex items-center justify-center text-xs text-white font-semibold"
                  style={{width: `${(selectedPresence.absents / selectedPresence.total) * 100}%`}}
                >
                  {selectedPresence.absents > 0 && selectedPresence.absents}
                </div>
              </div>
              <div className="flex justify-between mt-3 text-sm">
                <span className="text-green-300">Présents: {Math.round((selectedPresence.presents / selectedPresence.total) * 100)}%</span>
                <span className="text-red-300">Absents: {Math.round((selectedPresence.absents / selectedPresence.total) * 100)}%</span>
              </div>
            </div>

            {/* Informations du cours */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-xl">
              <p className="text-xs text-white/60 mb-2 font-medium">Cours</p>
              <p className="text-lg font-semibold text-white">{selectedPresence.coursNom}</p>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3 pt-4 border-t border-white/20">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  handleEditPresence(selectedPresence);
                }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl transition-all font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <Edit2 className="w-4 h-4" />
                Modifier la fiche
              </button>
              <button
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-xl transition-all font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <ClipboardList className="w-4 h-4" />
                Voir la liste complète
              </button>
            </div>
          </div>
        </ReusableGlassModal>
      )}
    </div>
  );
}