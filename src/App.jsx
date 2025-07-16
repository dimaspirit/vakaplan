import { useEffect } from 'react';

import { firebaseAuth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { Routes, Route } from 'react-router';
import AuthProtectedRoute from './AuthProtectedRoute';

import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';

import useAuthStore from './store/authStore';

function App() {
  const { isInitialized, setUser, setInitialized, user } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async(user) => {
      setUser(user);
      setInitialized(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
     <div className="font-geist">
      {isInitialized && <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<AuthProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>}

      {!isInitialized && <p>Loading</p>}
    </div>
  )
}

export default App
