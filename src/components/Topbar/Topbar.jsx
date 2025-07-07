import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Topbar() {
  const handleAddApplication = () => {
    console.log('handleAddApplication');
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="flex items-center gap-2 px-4"><Button onClick={handleAddApplication}>Add Application</Button></div>
    </header>
  )
}

