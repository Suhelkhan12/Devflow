"use server";

import { RegisterFormSchema } from "@/schemas";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterFormSchema>) => {
  const validatedFields = RegisterFormSchema.safeParse(values);
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async operation
  if (!validatedFields.success) {
    return { error: "Invalid input fields" };
  }

  return { success: "Login successfull" };
};
