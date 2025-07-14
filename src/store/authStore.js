import { create } from 'zustand';
import { firebaseSignUp, firebaseSignOut } from '../services/auth';

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  isInitialized: false,
  setUser: (user) => set({user}),
  signup: async(userCreds) => {
    const { user } = await firebaseSignUp(userCreds);

    set({
      isInitialized: true,
      loading: false,
      user: {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
      }
    });
  },
  signout: async() => {
    try {
      await firebaseSignOut();
      set({
        isInitialized: true,
        loading: false,
        user: null,
      });
    } catch(error) {
      throw new Error('Sign out is failed')
    }
  },
  setLoading: (loading) => set({loading}),
  setInitialized: (isInitialized) => set({isInitialized}),
}));

export default useAuthStore;