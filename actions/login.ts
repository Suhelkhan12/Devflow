"use server";

import * as z from "zod";
import { LoginFormSchema } from "@/schemas";
import { LoginActionTypes } from "@/lib/types";

export const login = async (values: z.infer<typeof LoginFormSchema>): Promise<LoginActionTypes> => {
  const validatedFields = LoginFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { responsetype: "error", message: "Invalid input fields." };
  }

  return { responsetype: "success", message: "Login successful." };
};
