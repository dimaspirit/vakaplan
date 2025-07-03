import {useState, useEffect} from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { NavLink, useLocation } from "react-router"
import { getProjects } from "../services/projects";

export function ProjectsMenu() {
  const { pathname } = useLocation();
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();

        setProjects(projectsData.map(item => ({
          id: item.uid,
          url: `/p/${item.uid}`,
          title: item.title,
        })));
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild isActive={pathname === item.url}>
                <NavLink
                  to={item.url}
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