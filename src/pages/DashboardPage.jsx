import { Button } from './../components/ui/button';
import { ProjectForm } from '../components/ProjectForm';
import useAuthStore from '../store/authStore';
import { ApplicationForm } from '../components/ApplicationForm';

function DashboardPage() {
  const { user } = useAuthStore();
  console.log("DashboardPage user:", user.uid);

  return (
    <>
      <p>DashboardPage</p>
      {user && <ProjectForm createdBy={user.uid} />}
      {/* <ApplicationForm /> */}
    </>
  )
}

export default DashboardPage