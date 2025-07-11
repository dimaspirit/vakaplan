import { z } from "zod"

export const formSchema = z.object({
  companyName: z.string().min(4, {
    message: "CompanyName must be at least 4 characters.",
  }),
  positionTitle: z.string().min(4, {
    message: "Position must be at least 4 characters.",
  }),
  vacancyUrl: z.string().optional(),
  projectId: z.string().min(1, {
    message: "Project is required.",
  }),
  notes: z.string().optional(),
});