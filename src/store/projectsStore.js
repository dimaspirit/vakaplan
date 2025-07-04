import { create } from 'zustand';
import { getProjects } from '../services/projects';

const useProjectsStore = create((set) => ({
  projects: [],
  syncProjects: async () => {
    const projects = await getProjects();
    set({ projects });
  },
}))

export default useProjectsStore;