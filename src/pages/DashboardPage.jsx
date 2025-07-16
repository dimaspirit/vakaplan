import useAuthStore from '../store/authStore';

function DashboardPage() {
  const user = useAuthStore(state => state.user);

  return (
    <>
      <p>DashboardPage</p>
    </>
  )
}

export default DashboardPage