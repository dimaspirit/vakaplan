import { Outlet, Navigate } from "react-router";
import useAuthStore from "./store/authStore";
import { AppSidebar } from "./components/AppSidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

import { Topbar } from "./components/Topbar";

const AuthProtectedRoute = () => {
  const user = useAuthStore(state => state.user);

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