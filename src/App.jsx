import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './firebase';
import useAuthStore from './store/authStore';

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
      {isInitialized && <p>Welcome to the app!</p>}

      {!isInitialized && <p>Loading</p>}
    </>
  )
}

export default App
