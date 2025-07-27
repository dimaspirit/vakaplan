import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ApplicationCard({application, onClick}) {
  const createdAt = application.createdAt.toDate().toLocaleDateString();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{application.positionTitle}</CardTitle>
        <CardDescription>{application.companyName}</CardDescription>
      </CardHeader>

      <CardContent>
        <Button variant="outline" className="w-full" onClick={() => onClick(application)}>
          Details
        </Button>
      </CardContent>
      <CardFooter>
        <CardDescription>Created: {createdAt}</CardDescription>
      </CardFooter>
    </Card>
  )
}