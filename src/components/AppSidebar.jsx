import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { AppMenu } from "./AppMenu";

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
      </SidebarContent>

      <SidebarFooter>
        {/* TODO: Add user menu */}
      </SidebarFooter>
    </Sidebar>
  )
}
