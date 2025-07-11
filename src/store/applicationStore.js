import { create } from 'zustand';
import { getApplications, createApplication as createApplicationFirebase, getApplicationByUID } from '../services/applications';

const useApplicationStore = create((set) => ({
  applications: [],
  syncApplications: async (userUID) => {
    const applications = await getApplications(userUID);
    set({ applications });
  },
  createApplication: async(newApplicationData) => {
    const applicationUID = await createApplicationFirebase(newApplicationData);
    const application = await getApplicationByUID(applicationUID);

    if(application) {
      set((state) => ({applications: state.applications.concat(application)}));
    } else {
      throw new Error(`useApplicationStore -> createApplication -> application ${applicationUID} does NOT created`);
    }
  }
}))

export default useApplicationStore;