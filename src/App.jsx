import { useEffect } from 'react';

import { firebaseAuth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { Routes, Route } from 'react-router';
import AuthProtectedRoute from './AuthProtectedRoute';

import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import ProjectPage from './pages/ProjectPage';

import useAuthStore from './store/authStore';
import useProjectsStore from './store/projectsStore';
import useApplicationStore from './store/applicationStore';

function App() {
  const { isInitialized, setUser, setInitialized, user } = useAuthStore();
  const { syncProjects } = useProjectsStore();
  const syncApplications = useApplicationStore((state) => state.syncApplications);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async(user) => {
      setUser(user);
      setInitialized(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if(user) {
      syncProjects();
      syncApplications(user.uid);
    }
  }, [user]);

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
