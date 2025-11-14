import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.email({
    error: "Email is required",
  }),
  password: z.string({
    error: "Password is required",
  }),
});
