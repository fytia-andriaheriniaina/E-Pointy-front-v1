import { useState } from "react";
import ReusableGlassModal from "./ReusableGlassModal";

export default function CourseFormModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    teacher: "",
    schedule: "",
    credits: "",
    description: "",
  });

  const update = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <ReusableGlassModal title="Créer un nouveau cours" onClose={onClose}>
      <div className="space-y-4">

        {/* Course Name */}
        <input
          name="name"
          onChange={update}
          placeholder="Nom du cours"
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none"
        />

        {/* Teacher */}
        <input
          name="teacher"
          onChange={update}
          placeholder="Enseignant"
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none"
        />

        {/* Schedule */}
        <input
          name="schedule"
          onChange={update}
          placeholder="Horaire (ex: Lundi 8h-10h)"
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none"
        />

        {/* Credits */}
        <input
          name="credits"
          type="number"
          onChange={update}
          placeholder="Crédits"
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none"
        />

        {/* Description */}
        <textarea
          name="description"
          onChange={update}
          placeholder="Description"
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none min-h-[80px]"
        ></textarea>

        {/* Button */}
        <button
          onClick={submit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
        >
          Enregistrer le cours
        </button>
      </div>
    </ReusableGlassModal>
  );
}
