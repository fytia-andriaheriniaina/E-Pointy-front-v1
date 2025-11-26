import { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../components/Modal';

export default function PresencesPage({ presences, setPresences, courses, students }) {
  const [showModal, setShowModal] = useState(false);
  const [newPresence, setNewPresence] = useState({ coursId: '', date: '', heureDebut: '', heureFin: '' });

  const handleAddPresence = () => {
    if (newPresence.coursId && newPresence.date) {
      const cours = courses.find(c => c.id === parseInt(newPresence.coursId));
      setPresences([
        ...presences,
        {
          id: Date.now(),
          ...newPresence,
          coursNom: cours?.nom || '',
          presents: 0,
          absents: students.length,
          total: students.length,
        },
      ]);
      setShowModal(false);
    } else {
      alert('Veuillez remplir les champs requis.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Présences</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Plus className="w-5 h-5" /> Ajouter
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">Cours</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b">Heure début</th>
              <th className="p-3 border-b">Heure fin</th>
              <th className="p-3 border-b">Présents</th>
              <th className="p-3 border-b">Absents</th>
              <th className="p-3 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {presences.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.coursNom}</td>
                <td className="p-3">{p.date}</td>
                <td className="p-3">{p.heureDebut}</td>
                <td className="p-3">{p.heureFin}</td>
                <td className="p-3 text-green-600 font-semibold">{p.presents}</td>
                <td className="p-3 text-red-500 font-semibold">{p.absents}</td>
                <td className="p-3">{p.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title="Ajouter une présence" onClose={() => setShowModal(false)}>
          <select
            className="w-full border rounded-lg p-2 mb-2"
            value={newPresence.coursId}
            onChange={(e) => setNewPresence({ ...newPresence, coursId: e.target.value })}
          >
            <option value="">Choisir un cours</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nom}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="w-full border rounded-lg p-2 mb-2"
            value={newPresence.date}
            onChange={(e) => setNewPresence({ ...newPresence, date: e.target.value })}
          />

          <input
            type="time"
            className="w-full border rounded-lg p-2 mb-2"
            value={newPresence.heureDebut}
            onChange={(e) => setNewPresence({ ...newPresence, heureDebut: e.target.value })}
          />

          <input
            type="time"
            className="w-full border rounded-lg p-2 mb-4"
            value={newPresence.heureFin}
            onChange={(e) => setNewPresence({ ...newPresence, heureFin: e.target.value })}
          />

          <button
            onClick={handleAddPresence}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            Ajouter
          </button>
        </Modal>
      )}
    </div>
  );
}
