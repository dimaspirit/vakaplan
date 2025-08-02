import { create } from 'zustand';
import { getApplications, createApplication as createApplicationFirebase, getApplicationByUID, updateApplication as updateApplicationFirebase } from '../services/applications';

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
  },
  updateApplication: async (applicationUID, updatedData) => {
    await updateApplicationFirebase(applicationUID, updatedData);
    const updatedApp = await getApplicationByUID(applicationUID);
    console.log('updatedApp', updatedApp)

    if (updatedApp) {
      set((state) => ({
        applications: state.applications.map((app) =>
          app.uid === applicationUID ? updatedApp : app
        )
      }));
    } else {
      throw new Error(`useApplicationStore -> updateApplication -> application ${applicationUID} was NOT found after update`);
    }
  }
}))

export default useApplicationStore;