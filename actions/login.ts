"use server";

import { signIn } from "@/auth";
import * as z from "zod";
import { LoginFormSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
  //safe parsing using zod method
  const validatedFields = LoginFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid input fields." };
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid login credentials." };
        case "AccessDenied":
          return { error: "Please verify your email." };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw err;
  }
};
