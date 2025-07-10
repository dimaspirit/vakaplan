import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ApplicationForm } from "../ApplicationForm";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Topbar() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </div>

        <div className="flex items-center gap-2 px-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add application</Button>
            </DialogTrigger>

            <DialogContent className="md:min-w-2xl lg:min-w-4xl">
              <DialogHeader>
                <DialogTitle>Let's add an application</DialogTitle>
              </DialogHeader>
              <ApplicationForm />
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </>
  )
}

