import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaClient, UserRole } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./lib/user";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id!);

      // it will not allow a non-verified email from loggin in.
      if (!existingUser || !existingUser.emailVerified) return false;

      // allow to sign in
      return true;
    },

    async session({ token, session }) {
      /**
       * We are sending the id created by our database to the session that has been created otherwise we will not have
       * id field assosiated with the user
       */
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      /**
       * sending token to the session for role based access
       */
      // checking if user is logged in or not because token/session will only be created when user is logged in.
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      // setting up role in token
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
