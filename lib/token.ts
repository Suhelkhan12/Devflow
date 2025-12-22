import { v4 as uuidV4 } from "uuid";
import db from "./prisma";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { PasswordResetToken, VerificationToken } from "@/app/generated/prisma/client";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

/**
 * Generates a new email verification token for a given email address.
 *
 * This function ensures that only **one active verification token**
 * exists per email at any given time by:
 * 1. Checking if a verification token already exists for the email.
 * 2. Deleting the existing token if found.
 * 3. Creating a new verification token with a 1-hour expiration.
 *
 * @param email - The email address for which the verification token is generated.
 * @returns A Promise that resolves to the newly created `VerificationToken`.
 * @throws {Error} Throws an error if token lookup, deletion, or creation fails.
 *
 * @example
 * const verificationToken = await generateVerificationToken("user@example.com");
 * console.log(verificationToken.token);
 */
export const generateVerificationToken = async (email: string): Promise<VerificationToken> => {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // Token valid for 1 hour

  // checking if an existing token is present for the email
  const existingToken = await getVerificationTokenByEmail(email);
  // if the token exists, we are going to delete it
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  // now creating the new token
  const verificationToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

/**
 * Generates a password reset token for a given email address.
 *
 * This function ensures that only **one active password reset token**
 * exists per email by:
 * 1. Checking if a reset token already exists for the email.
 * 2. Deleting the existing token if found.
 * 3. Creating a new token with a 1-hour expiration time.
 *
 * @param email - The email address for which the password reset token is generated.
 * @returns A Promise that resolves to the newly created `PasswordResetToken`.
 * @throws {Error} Throws an error if token lookup, deletion, or creation fails.
 *
 * @example
 * const resetToken = await generatePasswordResetToken("user@example.com");
 * console.log(resetToken.token);
 */
export const generatePasswordResetToken = async (email: string): Promise<PasswordResetToken> => {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // token valid for 1 hour

  // checking if the token already exits for the email
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  //create new token
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
