import { X } from "lucide-react";
import { useState } from "react";

export default function CourseFormModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    nom: "",
    code: "",
    enseignant: "",
    semestre: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.nom || !form.code || !form.enseignant || !form.semestre) return;
    onSave && onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Créer un cours</h2>

        <div className="space-y-3">
          <input
            type="text"
            name="nom"
            placeholder="Nom du cours"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="code"
            placeholder="Code du cours"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="enseignant"
            placeholder="Enseignant"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="semestre"
            placeholder="Semestre"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
