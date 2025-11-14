import * as z from "zod";

export type LoginActionTypes = {
  responsetype: "error" | "success";
  message: string;
};

export const LoginFormSchema = z.object({
  email: z.email({
    error: "Email is required",
  }),
  password: z.string({
    error: "Password is required",
  }),
});

export const RegisterFormSchema = z.object({
  name: z.string({
    error: "Name is required",
  }),
  email: z.email({
    error: "Email is required",
  }),
  password: z.string({
    error: "Minimum 6 characters required",
  }),
});
