// Tableau réutilisable pour la liste des étudiants.
// Props:
// - students: array
// - onView(student): callback pour ouvrir le profil
// - onEdit(student): callback si tu veux éditer
// - onDelete(studentId): callback pour suppression
import { QrCode, Eye } from 'lucide-react';

export default function StudentTable({ students = [], onView, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border-b">Nom</th>
            <th className="p-3 border-b">Prénom</th>
            <th className="p-3 border-b">Matricule</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Filière</th>
            <th className="p-3 border-b text-center">Contact</th>
            <th className="p-3 border-b text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{s.nom}</td>
              <td className="p-3">{s.prenom}</td>
              <td className="p-3">{s.matricule}</td>
              <td className="p-3">{s.email}</td>
              <td className="p-3">{s.filiere || '-'}</td>
              <td className="p-3 text-center">
                <QrCode className="w-5 h-5 mx-auto text-gray-600" />
              </td>
              <td className="p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView && onView(s)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded"
                    title="Voir profil"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
