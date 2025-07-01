import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink, useLocation } from "react-router"


const menuItems = [
  {
    id: 'dashboard',
    url: '/',
    label: 'Dashboard',
  },{
    id: 'settings',
    url: '/settings', 
    label: 'Settings',
  },
]

export function AppMenu() {
  const { pathname } = useLocation();

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
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
  )
}