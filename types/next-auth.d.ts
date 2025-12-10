/**
 * this is done to solve the typescript error in the auth.ts file callbacks.
 */
import NextAuth, { DefaultSession } from "next-auth";
import { UserRole } from "@/app/generated/prisma/enums";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
