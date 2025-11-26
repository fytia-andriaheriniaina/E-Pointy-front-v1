import { X } from "lucide-react";
import { useState } from "react";

export default function PresenceFormModal({ onClose, onSave, courses = [] }) {
  
  const [form, setForm] = useState({
    coursId: "",
    date: "",
    heureDebut: "",
    heureFin: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    if (!form.coursId || !form.date || !form.heureDebut || !form.heureFin) return;
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

        <h2 className="text-xl font-bold mb-4">Créer une fiche de présence</h2>

        <div className="space-y-4">
          {/* Sélecteur de cours */}
          <select
            name="coursId"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          >
            <option value="">-- Choisir un cours --</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.nom}</option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <input
            type="time"
            name="heureDebut"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <input
            type="time"
            name="heureFin"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        <button
          onClick={submit}
          className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
