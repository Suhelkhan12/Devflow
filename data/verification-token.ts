import { VerificationToken } from "@/app/generated/prisma/client";
import db from "@/lib/prisma";

/**
 * Fetches the email verification token associated with a given email address.
 *
 * This function queries the `verificationToken` table to find the most relevant
 * verification token for the provided email. It returns the token if found,
 * or `null` if no token exists for that email.
 *
 * @param email - The email address for which the verification token is requested.
 * @returns A Promise that resolves to a `VerificationToken` object if found,
 *          or `null` if no matching token exists.
 * @throws {Error} Throws an error if the database query fails.
 *
 * @example
 * const token = await getVerificationTokenByEmail("user@example.com");
 * if (token) {
 *   console.log(token.token);
 * }
 */
export const getVerificationTokenByEmail = async (email: string): Promise<VerificationToken> => {
  try {
    const verificationToken = (await db.verificationToken.findFirst({
      where: { email },
    })) as VerificationToken;

    return verificationToken;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch verification token from the database.");
  }
};

/**
 * Fetches the email verification token associated with a given email address.
 *
 * This function queries the `verificationToken` table to find the most relevant
 * verification token for the provided email. It returns the token if found,
 * or `null` if no token exists for that email.
 *
 * @param token - the token string for which the verification token is requested.
 * @returns A Promise that resolves to a `VerificationToken` object if found,
 *          or `null` if no matching token exists.
 * @throws {Error} Throws an error if the database query fails.
 *
 * @example
 * const token = await getVerificationTokenByEmail("user@example.com");
 * if (token) {
 *   console.log(token.token);
 * }
 */
export const getVerificationTokenByToken = async (token: string): Promise<VerificationToken> => {
  try {
    const verificationToken = (await db.verificationToken.findUnique({
      where: { token },
    })) as VerificationToken;

    return verificationToken;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch verification token from the database.");
  }
};
