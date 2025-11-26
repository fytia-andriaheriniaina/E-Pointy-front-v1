import { useState } from 'react';
import { Plus, Eye } from 'lucide-react';
import StudentFormModal from '../components/StudentFormModal';
import StudentProfileModal from '../components/StudentProfileModal';

export default function StudentsPage({ students, setStudents, filieres }) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleAddStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now(), qrCode: 'QR-' + student.matricule }]);
    setShowFormModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold uppercase">Gestion des étudiants</h1>
        <button
          onClick={() => setShowFormModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
            Inscrire un étudiant
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse ">
          <thead>
            <tr className="hover:bg-gray-50 uppercase text-center">
              <th className="p-3 border-b">Nom</th>
              <th className="p-3 border-b">Prénom</th>
              <th className="p-3 border-b">Matricule</th>
              <th className="p-3 border-b">Email</th> 
              <th className="p-3 border-b">Niveau</th>
              <th className="p-3 border-b text-center">Contact</th>
              <th className="p-3 border-b text-center">Profil</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 text-center">
                <td className="p-3 text-center">{s.nom}</td>
                <td className="p-3 text-center">{s.prenom}</td>
                <td className="p-3 text-center">{s.matricule}</td>
                <td className="p-3 text-center">{s.email}</td>
                <td className="p-3 text-center">{s.niveau}</td>
                <td className="p-3 text-center">{s.telephone}</td>
                <td className="p-3 text-center ">
                  <button
                    onClick={() => setSelectedStudent(s)}
                    className="text-blue-600 hover:text-blue-800 flex items-center cursor-pointer gap-1"
                  >
                    <Eye className="w-4 h-4 cursor-pointer" />
                    Voir profil   
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showFormModal && (
        <StudentFormModal
          filieres={filieres}
          onClose={() => setShowFormModal(false)}
          onAdd={handleAddStudent}
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
