import * as z from "zod";

const emailErrorMessage = "Even spam bots do better. Give it another shot.";
const passwordErrorMessage = "We literally wrote the rules right above this box. At least pretend to read them";

export const formSchema = z.object({
  email: z.email(emailErrorMessage),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, passwordErrorMessage),
});