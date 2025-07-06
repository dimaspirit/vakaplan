import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { NavLink, useLocation } from "react-router"
import useProjectsStore from "../store/projectsStore";

export function ProjectsMenu() {
  const { pathname } = useLocation();
  const projects = useProjectsStore((state) => state.projects);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.uid}>
            <SidebarMenuButton asChild isActive={pathname === `/p/${item.uid}`}>
                <NavLink
                  to={`/p/${item.uid}`}
                  className={({ isActive }) =>
                    isActive ? "active" : ""
                  }
                >{item.title}</NavLink>
            </SidebarMenuButton>
        </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}