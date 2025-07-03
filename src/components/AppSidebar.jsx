import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { AppMenu } from "./AppMenu";
import { ProjectsMenu } from "./ProjectsMenu";

export function AppSidebar({...props}) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium text-2xl">Vakaplan</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <AppMenu />
        <ProjectsMenu />
      </SidebarContent>

      <SidebarFooter>
        {/* TODO: Add user menu */}
      </SidebarFooter>
    </Sidebar>
  )
}
