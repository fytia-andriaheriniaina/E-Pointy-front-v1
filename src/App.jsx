import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import CoursesPage from './pages/CoursesPage';
import PresencesPage from './pages/PresencesPage';
import LoginPage from './pages/LoginPage';
import { mockStudents, mockCourses, mockPresences } from './data/mockData';
import PrivateRoute from './components/PrivateRoute';


export default function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const [students, setStudents] = useState(mockStudents);
  const [courses, setCourses] = useState(mockCourses);
  const [presences, setPresences] = useState(mockPresences);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    // Si pas connecté, on ne montre que le LoginPage
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }


  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 p-8 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}, bg-gradient-to-br from-slate-900/80 via-blue-900/80 pt-8 to-slate-900/80`}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/dashboard"
            element={<Dashboard students={students} courses={courses} presences={presences} />}
          />
          <Route
            path="/students"
            element={<StudentsPage students={students} setStudents={setStudents} />}
          />
          <Route
            path="/courses"
            element={<CoursesPage courses={courses} setCourses={setCourses} />}
          />
          <Route
            path="/presences"
            element={<PresencesPage presences={presences} setPresences={setPresences} courses={courses} students={students} />}
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />

          
        </Routes>
        
      </div>
    </div>
  );
}
