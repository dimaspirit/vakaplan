import * as z from "zod";

const emailErrorMessage = "Even spam bots do better. Give it another shot.";
const passwordErrorMessage = "This password couldn't scare a hacker if it tried.";

export const formSchema = z.object({
  email: z.email(emailErrorMessage),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, passwordErrorMessage),
});