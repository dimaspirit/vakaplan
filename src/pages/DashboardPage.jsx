import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { ProjectForm } from '../components/ProjectForm';
import { ApplicationForm } from '../components/ApplicationForm';
import useProjectsStore from '../store/projectsStore';

function DashboardPage() {
  const { user } = useAuthStore();
  const { syncProjects, projects } = useProjectsStore();

  useEffect(() => {
    syncProjects();
  }, [syncProjects]);

  return (
    <>
      <p>DashboardPage</p>
      {user && <ProjectForm createdBy={user.uid} />}
      <ApplicationForm projects={projects} />
    </>
  )
}

export default DashboardPage