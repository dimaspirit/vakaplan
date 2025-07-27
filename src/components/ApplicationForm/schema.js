import { z } from "zod"

export const formSchema = z.object({
  companyName: z.string().min(4, {
    message: "Company name  must be at least 4 characters.",
  }),
  positionTitle: z.string().min(4, {
    message: "Positions title must be at least 4 characters.",
  }),
  status: z.string().optional(),
  vacancyUrl: z.string().optional(),
  notes: z.string().optional(),
});