import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ApplicationForm } from "./ApplicationForm/ApplicationForm";

export function ApplicationDetailsDialog({ application, open, onClose }) {
  // const createdAt = application.createdAt.toDate().toLocalDateString();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="relative md:min-w-2xl lg:min-w-4xl">
        <DialogHeader>
          <DialogTitle>Keep your application fresh</DialogTitle>
          <DialogDescription>Review and update details as things evolve with your job search.</DialogDescription>
        </DialogHeader>

        <ApplicationForm mode="edit" application={application} onSubmitForm={onClose} />

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
