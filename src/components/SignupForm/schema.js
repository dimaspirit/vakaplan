import * as z from "zod";

export const formSchema = z.object({
  email: z.email({
    message: "Even spam bots do better. Give it another shot.",
  }),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, { error: "We literally wrote the rules right above this box. At least pretend to read them." }),
});