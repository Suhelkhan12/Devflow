"use server";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetFormSchema } from "@/schemas";
import * as z from "zod";

export const resetPassword = async (values: z.infer<typeof ResetFormSchema>) => {
  //safe parsing using zod method
  const validatedFields = ResetFormSchema.safeParse(values);
  if (validatedFields.error) return { error: "Invalid input fields!" };
  const { email } = validatedFields.data;

  // checking if the user with this email exits or not
  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "Email does not exits." };

  /**
   * if user exits:
   * 1- generate token
   * 2- send reset email
   */
  const resetToken = await generatePasswordResetToken(existingUser.email as string);
  await sendPasswordResetEmail(existingUser.name!, existingUser.email!, resetToken.token);

  return { success: "Password reset link sent to your email." };
};
