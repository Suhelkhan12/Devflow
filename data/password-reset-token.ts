import { PasswordResetToken } from "@/app/generated/prisma/client";
import db from "@/lib/prisma";

/**
 * Fetches the password reset token associated with a given email address.
 *
 * This function queries the `passwordResetToken` table to find a reset token
 * for the provided email. If no token exists, it returns `null`.
 *
 * @param token - The token for which the password reset token is requested.
 * @returns A Promise that resolves to a `PasswordResetToken` if found,
 *          or `null` if no matching token exists.
 * @throws {Error} Throws an error if the database query fails.
 *
 * @example
 * const token = await getPasswordResetTokenByEmail("user@example.com");
 * if (!token) {
 *   console.log("No reset token found");
 * }
 */
export const getPasswordResetTokenByToken = async (token: string): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

/**
 * Fetches the password reset token associated with a given email address.
 *
 * This function queries the `passwordResetToken` table to find a reset token
 * for the provided email. If no token exists, it returns `null`.
 *
 * @param email - The email address for which the password reset token is requested.
 * @returns A Promise that resolves to a `PasswordResetToken` if found,
 *          or `null` if no matching token exists.
 * @throws {Error} Throws an error if the database query fails.
 *
 * @example
 * const token = await getPasswordResetTokenByEmail("user@example.com");
 * if (!token) {
 *   console.log("No reset token found");
 * }
 */
export const getPasswordResetTokenByEmail = async (email: string): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    console.log(passwordResetToken);
    return passwordResetToken;
  } catch {
    return null;
  }
};
