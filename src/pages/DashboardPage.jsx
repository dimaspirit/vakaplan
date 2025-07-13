import useAuthStore from '../store/authStore';
import { ProjectForm } from '../components/ProjectForm';
import useProjectsStore from '../store/projectsStore';
import useApplicationStore from '../store/applicationStore';

function DashboardPage() {
  const { user } = useAuthStore();
  const { projects } = useProjectsStore();
  const applications = useApplicationStore((state) => state.applications);

  console.log('Applications in DashboardPage:', applications);

  return (
    <>
      <p>DashboardPage</p>
      {user && <ProjectForm createdBy={user.uid} />}
      {applications.length > 0 && (
        <div>
          <h2>Your Applications</h2>
          <ul>
            {applications.map((app) => (
              <li key={app.uid}>
                <h3>{app.positionTitle} at {app.companyName}</h3>
                <p>Notes: {app.notes}</p>
                <p>Vacancy URL: <a href={app.vacancyUrl} target="_blank" rel="noopener noreferrer">{app.vacancyUrl}</a></p>
                <p>Project: {app.projectId}</p>
                <p>Created At: {app.createdAt?.toDate().toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )} 
    </>
  )
}

export default DashboardPage