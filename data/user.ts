import db from "@/lib/prisma";
import type { User } from "@/app/generated/prisma/client";

/**
 * Fetches a user from the database by their email.
 *
 * @param {string} email - The email address of the user to retrieve.
 * @returns {Promise<import('@prisma/client').User | null>}
 *          Returns the user object if found, or `null` if no user exists
 *          with the provided email or if an error occurs.
 *
 * @example
 * const user = await getUserByEmail("example@email.com");
 * if (user) {
 *   console.log("User found:", user.name);
 * } else {
 *   console.log("User not found.");
 * }
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: {
        email, // shorthand for email: email
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user details from the database.");
  }
};

/**
 * Fetches a user from the database by their unique ID.
 *
 * This function attempts to find a user in the `user` table whose `id` matches
 * the provided string. If the query fails due to a database error, it throws an error.
 *
 * @param id - The unique identifier of the user to fetch (string).
 * @returns A Promise that resolves to the user object if found, or `null` if no user exists
 *          with the given ID.
 * @throws {Error} Throws an error if there is a problem fetching the user from the database.
 *
 * @example
 * const user = await getUserById("abc123");
 * if (user) {
 *   console.log(user.name);
 * } else {
 *   console.log("User not found");
 * }
 */
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: {
        id, // shorthand for id: id
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user details from the database.");
  }
};
