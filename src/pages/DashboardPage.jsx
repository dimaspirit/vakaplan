import useAuthStore from '../store/authStore';
import { ProjectForm } from '../components/ProjectForm';

function DashboardPage() {
  const user = useAuthStore(state => state.user);

  return (
    <>
      <p>DashboardPage</p>
      {user && <ProjectForm createdBy={user.uid} />}
    </>
  )
}

export default DashboardPage