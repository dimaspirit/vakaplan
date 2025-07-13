import useAuthStore from '../store/authStore';
import { ProjectForm } from '../components/ProjectForm';
import useApplicationStore from '../store/applicationStore';

function DashboardPage() {
  const user = useAuthStore(state => state.user);
  const applications = useApplicationStore((state) => state.applications);

  console.log('Applications in DashboardPage:', applications);

  return (
    <>
      <p>DashboardPage</p>
      {user && <ProjectForm createdBy={user.uid} />}
    </>
  )
}

export default DashboardPage