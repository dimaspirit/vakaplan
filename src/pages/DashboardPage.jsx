import { Button } from "@/components/ui/button"
import { useState } from 'react';
import useAuthStore from '../store/authStore';
import useApplicationStore from '../store/applicationStore';


import { ApplicationCard } from '@/components/ApplicationCard';
import { ApplicationDetailsDialog } from "@/components/ApplicationDetailsDialog";

function DashboardPage() {
  const user = useAuthStore(state => state.user);
  const applications = useApplicationStore((state) => state.applications);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const handleClose = () => setSelectedApplication(null);

  return (
      <>
        <div className="grid grid-cols-12 gap-4">
          {applications.map((application) => (
            <div
              key={application.uid}
              className="col-span-12 sm:col-span-6 lg:col-span-4">
                <ApplicationCard  application={application} onClick={setSelectedApplication} />
            </div>
          ))}
        </div>

        {selectedApplication && (
          <ApplicationDetailsDialog application={selectedApplication} open={!!selectedApplication} onClose={handleClose} />
        )}
      </>
  )
}

export default DashboardPage