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
import useProjectsStore from "../store/projectsStore";

export function ProjectsMenu() {
  const { pathname } = useLocation();
  const projects = useProjectsStore((state) => state.projects);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.uid}>
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