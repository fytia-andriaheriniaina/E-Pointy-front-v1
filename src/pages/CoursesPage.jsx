import { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../components/Modal';

export default function CoursesPage({ courses, setCourses }) {
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ code: '', nom: '', enseignant: '', semestre: '' });

  const handleAddCourse = () => {
    if (newCourse.code && newCourse.nom) {
      setCourses([...courses, { ...newCourse, id: Date.now() }]);
      setNewCourse({ code: '', nom: '', enseignant: '', semestre: '' });
      setShowModal(false);
    } else {
      alert('Veuillez remplir les champs obligatoires.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Liste des cours</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus className="w-5 h-5" /> Ajouter
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">Code</th>
              <th className="p-3 border-b">Nom</th>
              <th className="p-3 border-b">Enseignant</th>
              <th className="p-3 border-b">Semestre</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{c.code}</td>
                <td className="p-3">{c.nom}</td>
                <td className="p-3">{c.enseignant}</td>
                <td className="p-3">{c.semestre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title="Ajouter un cours" onClose={() => setShowModal(false)}>
          <input
            placeholder="Code"
            className="w-full border rounded-lg p-2 mb-2"
            value={newCourse.code}
            onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
          />
          <input
            placeholder="Nom du cours"
            className="w-full border rounded-lg p-2 mb-2"
            value={newCourse.nom}
            onChange={(e) => setNewCourse({ ...newCourse, nom: e.target.value })}
          />
          <input
            placeholder="Enseignant"
            className="w-full border rounded-lg p-2 mb-2"
            value={newCourse.enseignant}
            onChange={(e) => setNewCourse({ ...newCourse, enseignant: e.target.value })}
          />
          <input
            placeholder="Semestre"
            className="w-full border rounded-lg p-2 mb-4"
            value={newCourse.semestre}
            onChange={(e) => setNewCourse({ ...newCourse, semestre: e.target.value })}
          />
          <button onClick={handleAddCourse} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Ajouter
          </button>
        </Modal>
      )}
    </div>
  );
}
