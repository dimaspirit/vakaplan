import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ApplicationDetailsDialog({ application, open, onClose }) {
  // const createdAt = application.createdAt.toDate().toLocalDateString();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="relative md:min-w-2xl lg:min-w-4xl">
        <DialogHeader>
          <DialogTitle>{application?.positionTitle}</DialogTitle>
          <DialogDescription>{application?.companyName}</DialogDescription>
        </DialogHeader>

        <h1>Application details</h1>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
