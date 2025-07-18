import { useEffect } from "react";
import { Outlet, Navigate } from "react-router";

import useAuthStore from "./store/authStore";
import useApplicationStore from "./store/applicationStore";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { Topbar } from "./components/Topbar";
import { AppSidebar } from "./components/AppSidebar";

const AuthProtectedRoute = () => {
  const user = useAuthStore(state => state.user);
  const syncApplications = useApplicationStore(state => state.syncApplications);

  useEffect(() => {
    if(user && user.uid) {
      syncApplications(user.uid);
    }
  }, [user, syncApplications]);

  if(!user) return <Navigate to="/auth" />;

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Topbar />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AuthProtectedRoute;