"use server";
import db from "@/lib/prisma";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerifcation = async (token: string) => {
  // check if the token exists
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "User token does not exit!" };
  }
  // if user token has expired
  const hasExpired = existingToken.expires < new Date();
  if (hasExpired) {
    return { error: "Token has expired. Please request a new verification email." };
  }
  // verify the user
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }
  // updating the user to verified
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      // this will be used when user is trying to update the email
      email: existingToken.email,
    },
  });
  // removing the verification token after successful verification
  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified successfully!" };
};
