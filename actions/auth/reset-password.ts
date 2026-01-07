"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import db from "@/lib/prisma";
import { NewPasswordServerSchema } from "@/schemas";
import bcrypt from "bcrypt";

export const resetPassword = async (token: string, newPassword: string) => {
  if (!token) {
    return { error: "Missing user token." };
  }
  // validating fields
  const validatedFields = NewPasswordServerSchema.safeParse({ newPassword });
  if (!validatedFields.success) {
    return { error: "Invalid password value." };
  }
  const { newPassword: newPass } = validatedFields.data;

  // geting the token value form db
  const existingToken = await getPasswordResetTokenByToken(token);
  // if no token exits in db
  if (!existingToken) {
    return { error: "Invalid user token." };
  }
  // if user token has expired
  const hasExpired = existingToken.expires < new Date();
  if (hasExpired) {
    return { error: "Token has expired. Please request a new verification email." };
  }
  // checking if user is present in the db for which password change is taking place
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exits.  " };
  }
  // encrypting the password here using bcrypt package
  const hashedPassword = await bcrypt.hash(newPass, 10);

  //updating the password of the user
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });
  // reseting the token from the db for reusing it
  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password is updated." };
};
