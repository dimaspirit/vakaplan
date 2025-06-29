import { Outlet, Navigate } from "react-router";
import useAuthStore from "./store/authStore";

const AuthProtectedRoute = () => {
  const {user} = useAuthStore();

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthProtectedRoute;