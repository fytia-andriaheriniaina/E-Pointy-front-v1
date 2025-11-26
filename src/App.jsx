import { useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import CoursesPage from './pages/CoursesPage';
import PresencesPage from './pages/PresencesPage';
import LoginPage from './pages/LoginPage';
import { mockStudents, mockCourses, mockPresences } from './data/mockData';

export default function App() {
  const { isAuthenticated } = useContext(AuthContext);  // Vérification de l'authentification
  const [students, setStudents] = useState(mockStudents);
  const [courses, setCourses] = useState(mockCourses);
  const [presences, setPresences] = useState(mockPresences);

  // State pour gérer l'affichage de la sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirection vers la page de login si l'utilisateur n'est pas authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      // Rediriger vers la page de login si l'utilisateur n'est pas connecté
      <Navigate to="/login" replace />;
    }
  }, [isAuthenticated]);

  // Si l'utilisateur n'est pas authentifié, redirige vers la page de login
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Contenu principal */}
      <div className={`flex-1 p-8 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard students={students} courses={courses} presences={presences} />} />
          <Route path="/students" element={<StudentsPage students={students} setStudents={setStudents} />} />
          <Route path="/courses" element={<CoursesPage courses={courses} setCourses={setCourses} />} />
          <Route
            path="/presences"
            element={<PresencesPage presences={presences} setPresences={setPresences} courses={courses} students={students} />}
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}
