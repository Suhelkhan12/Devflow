"use server";

import * as z from "zod";
import { LoginActionTypes, RegisterFormSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterFormSchema>): Promise<LoginActionTypes> => {
  const validatedFields = RegisterFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { responsetype: "error", message: "Something went wrong." };
  }

  return { responsetype: "success", message: "Signin successful." };
};
