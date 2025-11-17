"use server";

import * as z from "zod";
import { LoginFormSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
  const validatedFields = LoginFormSchema.safeParse(values);
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async operation
  if (!validatedFields.success) {
    return { error: "Invalid input fields" };
  }

  return { success: "Login successfull" };
};
