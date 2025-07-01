import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { NavLink, useLocation } from "react-router"


const projects = [
  {
    id: 'Zero project',
    url: '/p/0',
    label: 'Zero sprint',
  }
]

export function ProjectsMenu() {
  const { pathname } = useLocation();

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
                >{item.label}</NavLink>
            </SidebarMenuButton>
        </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}