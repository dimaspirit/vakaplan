import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './firebase';
import useAuthStore from './store/authStore';
import { Routes, Route } from 'react-router';

import AuthPage from './pages/AuthPage';
import AuthProtectedRoute from './AuthProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';

function App() {
 const { isInitialized, setUser, setInitialized } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async(user) => {
      setUser(user);
      setInitialized(true);
    });

    return () => {
      unsubscribe();
    };
  }, [setInitialized, setUser]);

  return (
     <>
      {isInitialized && <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<AuthProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>}

      {!isInitialized && <p>Loading</p>}
    </>
  )
}

export default App
