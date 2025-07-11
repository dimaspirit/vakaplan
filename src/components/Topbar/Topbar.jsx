import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ApplicationForm } from "@/components/ApplicationForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Topbar() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </div>

        <div className="flex items-center gap-2 px-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Add an application</Button>
            </DialogTrigger>

            <DialogContent className="md:min-w-2xl lg:min-w-4xl">
              <DialogHeader>
                <DialogTitle>Let's add an application</DialogTitle>
                <DialogDescription>Fill out the details to start tracking a job you applied for.</DialogDescription>
              </DialogHeader>
              <ApplicationForm onSubmitForm={handleClose} />
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </>
  )
}

