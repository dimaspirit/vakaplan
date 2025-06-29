import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  isInitialized: false,
  setUser: (user) => set({user}),
  setLoading: (loading) => set({loading}),
  setInitialized: (isInitialized) => set({isInitialized}),
}));

export default useAuthStore;