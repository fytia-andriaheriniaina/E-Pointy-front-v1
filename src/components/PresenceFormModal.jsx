import { useState } from "react";
import { ClipboardList } from "lucide-react";
import ReusableGlassModal from "./ReusableGlassModal";

export default function PresenceFormModal({ onClose, onSubmit, courses = [], students = [] }) {
  const [formData, setFormData] = useState({
    courseId: "",
    date: "",
    teacher: "",
    semester: "",
    department: "",
    level: "",
    presentStudents: [],
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Validation du formulaire
  const validate = () => {
    const newErrors = {};
    if (!formData.courseId) newErrors.courseId = "Veuillez sélectionner un cours";
    if (!formData.date) newErrors.date = "Veuillez sélectionner une date";
    if (!formData.teacher.trim()) newErrors.teacher = "Le nom de l'enseignant est requis";
    if (!formData.semester) newErrors.semester = "Veuillez sélectionner un semestre";
    if (!formData.department) newErrors.department = "Veuillez sélectionner une filière";
    if (!formData.level) newErrors.level = "Veuillez sélectionner un niveau";
    if (formData.presentStudents.length === 0) newErrors.students = "Veuillez sélectionner au moins un étudiant présent";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Filtrage des étudiants selon recherche + niveau + filière
  const filteredStudents = students
    .filter(st => st.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(st => formData.level ? st.level === formData.level : true)
    .filter(st => formData.department ? st.department === formData.department : true);

  const toggleStudent = (id) => {
    setFormData((prev) => ({
      ...prev,
      presentStudents: prev.presentStudents.includes(id)
        ? prev.presentStudents.filter(s => s !== id)
        : [...prev.presentStudents, id]
    }));
    if (errors.students) setErrors(prev => ({ ...prev, students: undefined }));
  };

  const toggleAll = () => {
    if (formData.presentStudents.length === filteredStudents.length) {
      setFormData(prev => ({ ...prev, presentStudents: [] }));
    } else {
      setFormData(prev => ({
        ...prev,
        presentStudents: filteredStudents.map(st => st.id)
      }));
    }
  };

  const submit = () => {
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  const selectedCourse = courses.find(c => c.id === formData.courseId);

  return (
    <ReusableGlassModal 
      title="Nouvelle feuille de présence" 
      icon={<ClipboardList className="w-8 h-8" />}
      size="lg"
      onClose={onClose}
    >
      <div className="space-y-5">

        {/* Course */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white/90 mb-1.5">Cours *</label>
          <div className="relative">
            <select
              value={formData.courseId}
              onChange={(e) => { 
                setFormData({ ...formData, courseId: e.target.value });
                if (errors.courseId) setErrors(prev => ({ ...prev, courseId: undefined }));
              }}
              className={`w-full p-3.5 pl-4 rounded-xl bg-white/10 backdrop-blur-sm text-white outline-none border-2 transition-all ${
                errors.courseId ? 'border-red-400/50 focus:border-red-400' : 'border-white/20 focus:border-blue-400/60'
              } hover:bg-white/15 cursor-pointer appearance-none`}
              style={{ backgroundImage: 'none' }}
            >
              <option value="" disabled>Choisir un cours</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none">▼</div>
          </div>
          {errors.courseId && <p className="text-red-400 text-sm mt-1">⚠ {errors.courseId}</p>}
          {selectedCourse && (
            <div className="text-sm text-white/60 mt-1 bg-white/5 rounded-lg p-2 border border-white/10">
              <span className="font-medium">{selectedCourse.name}</span> sélectionné
            </div>
          )}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white/90 mb-1.5">Date *</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => { setFormData({ ...formData, date: e.target.value }); if(errors.date) setErrors(prev => ({...prev, date: undefined})); }}
            className={`w-full p-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white outline-none border-2 ${
              errors.date ? 'border-red-400/50 focus:border-red-400' : 'border-white/20 focus:border-blue-400/60'
            } hover:bg-white/15`}
          />
          {errors.date && <p className="text-red-400 text-sm mt-1">⚠ {errors.date}</p>}
        </div>

        {/* Teacher */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white/90 mb-1.5">Enseignant *</label>
          <input
            type="text"
            placeholder="Nom de l'enseignant"
            value={formData.teacher}
            onChange={(e) => { setFormData({ ...formData, teacher: e.target.value }); if(errors.teacher) setErrors(prev => ({...prev, teacher: undefined})); }}
            className={`w-full p-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/50 outline-none border-2 ${
              errors.teacher ? 'border-red-400/50 focus:border-red-400' : 'border-white/20 focus:border-blue-400/60'
            } hover:bg-white/15`}
          />
          {errors.teacher && <p className="text-red-400 text-sm mt-1">⚠ {errors.teacher}</p>}
        </div>

        {/* Semester */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white/90 mb-1.5">Semestre *</label>
          <select
            value={formData.semester}
            onChange={(e) => { setFormData({ ...formData, semester: e.target.value }); if(errors.semester) setErrors(prev => ({...prev, semester: undefined})); }}
            className="w-full p-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white outline-none border-2 border-white/20 focus:border-blue-400/60 hover:bg-white/15 cursor-pointer"
          >
            <option value="" disabled>Choisir un semestre</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
          </select>
          {errors.semester && <p className="text-red-400 text-sm mt-1">⚠ {errors.semester}</p>}
        </div>

        {/* Department */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white/90 mb-1.5">Filière *</label>
          <select
            value={formData.department}
            onChange={(e) => { 
              setFormData({ ...formData, department: e.target.value, presentStudents: [] }); 
              if(errors.department) setErrors(prev => ({...prev, department: undefined}));
            }}
            className="w-full p-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white outline-none border-2 border-white/20 focus:border-blue-400/60 hover:bg-white/15 cursor-pointer"
          >
            <option value="" disabled>Choisir une filière</option>
            <option value="Informatique">Informatique</option>
            <option value="Mathématiques">Mathématiques</option>
            <option value="Physique">Physique</option>
          </select>
          {errors.department && <p className="text-red-400 text-sm mt-1">⚠ {errors.department}</p>}
        </div>

        {/* Level */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white/90 mb-1.5">Niveau *</label>
          <select
            value={formData.level}
            onChange={(e) => { 
              setFormData({ ...formData, level: e.target.value, presentStudents: [] }); 
              if(errors.level) setErrors(prev => ({...prev, level: undefined}));
            }}
            className="w-full p-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white outline-none border-2 border-white/20 focus:border-blue-400/60 hover:bg-white/15 cursor-pointer"
          >
            <option value="" disabled>Choisir un niveau</option>
            <option value="L1">L1</option>
            <option value="L2">L2</option>
            <option value="L3">L3</option>
            <option value="M1">M1</option>
            <option value="M2">M2</option>
          </select>
          {errors.level && <p className="text-red-400 text-sm mt-1">⚠ {errors.level}</p>}
        </div>

        {/* Students */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-semibold text-white/90">Étudiants présents *</label>
            <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">
              {formData.presentStudents.length}/{filteredStudents.length}
            </span>
          </div>

          {/* Search bar */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Rechercher un étudiant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/50 outline-none border-2 border-white/20 focus:border-blue-400/60 transition-all hover:bg-white/15"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition">✕</button>
            )}
          </div>

          <button
            onClick={toggleAll}
            className="w-full p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-sm font-medium border border-white/10 transition-all mb-2"
          >
            {formData.presentStudents.length === filteredStudents.length ? 'Tout désélectionner' : 'Tout sélectionner'}
          </button>

          <div className={`max-h-52 overflow-y-auto bg-white/5 rounded-xl border-2 transition-all ${errors.students ? 'border-red-400/50' : 'border-white/10'} custom-scrollbar`}>
            {filteredStudents.length > 0 ? (
              <div className="p-2 space-y-1">
                {filteredStudents.map(st => (
                  <label key={st.id} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${formData.presentStudents.includes(st.id) ? 'bg-green-500/20 border border-green-400/30' : 'bg-white/5 hover:bg-white/10 border border-transparent'}`}>
                    <input
                      type="checkbox"
                      checked={formData.presentStudents.includes(st.id)}
                      onChange={() => toggleStudent(st.id)}
                      className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 checked:bg-green-500 checked:border-green-500 cursor-pointer transition-all"
                    />
                    <span className="text-white font-medium flex-1">{st.name}</span>
                    {formData.presentStudents.includes(st.id) && <span className="text-green-400 text-sm font-semibold">Présent</span>}
                  </label>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-white/50">
                <p>Aucun étudiant trouvé</p>
              </div>
            )}
          </div>
          {errors.students && <p className="text-red-400 text-sm mt-1">⚠ {errors.students}</p>}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white/90 mb-1.5">Notes <span className="text-white/50 font-normal">(facultatif)</span></label>
          <textarea
            placeholder="Ajoutez des notes ou observations..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full p-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/50 outline-none border-2 border-white/20 focus:border-blue-400/60 transition-all hover:bg-white/15 min-h-[90px] resize-none custom-scrollbar"
          />
          <p className="text-xs text-white/50">{formData.notes.length}/500 caractères</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 bg-white/10 hover:bg-white/15 text-white py-3.5 rounded-xl font-semibold transition-all border border-white/20 hover:border-white/30">Annuler</button>
          <button onClick={submit} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.02] active:scale-[0.98]">Enregistrer</button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
      `}</style>
    </ReusableGlassModal>
  );
}
