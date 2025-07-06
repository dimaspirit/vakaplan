import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './firebase';
import useAuthStore from './store/authStore';
import { Routes, Route } from 'react-router';

import AuthPage from './pages/AuthPage';
import AuthProtectedRoute from './AuthProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import ProjectPage from './pages/ProjectPage';
import useProjectsStore from './store/projectsStore';

function App() {
 const { isInitialized, setUser, setInitialized, user } = useAuthStore();
 const { syncProjects } = useProjectsStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async(user) => {
      setUser(user);
      setInitialized(true);
    });

    return () => {
      unsubscribe();
    };
  }, [setInitialized, setUser]);  

  useEffect(() => {
    if(user) {
      syncProjects();
    }
    
  }, [user, syncProjects]);

  return (
     <div className="font-geist">
      {isInitialized && <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<AuthProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/p/:id" element={<ProjectPage />} />
        </Route>
      </Routes>}

      {!isInitialized && <p>Loading</p>}
    </div>
  )
}

export default App
