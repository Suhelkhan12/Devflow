import NextAuth from "next-auth";
// import authConfig from "./auth.config";
import { PrismaClient, UserRole } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/data/user";
import db from "./lib/prisma";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   pages: {
//     signIn: "/auth/log-in",
//     error: "/auth/error",
//     signOut: "/",
//   },
//   events: {
//     // this will be used to auto verify email when user is signing in using OAuth providers
//     async linkAccount({ user }) {
//       // update emailVerified field of user to current date
//       await db.user.update({
//         where: { id: user.id },
//         data: { emailVerified: new Date() },
//       });
//     },
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       // allow all OAuth provider logins
//       if (account?.provider !== "credentials") return true;

//       const existingUser = await getUserById(user.id!);
//       // if the email of user is not verified, block the login
//       if (!existingUser?.emailVerified) return false;

//       // todo add 2FA check here

//       // allow to sign in
//       return true;
//     },

//     async session({ token, session }) {
//       /**
//        * We are sending the id created by our database to the session that has been created otherwise we will not have
//        * id field assosiated with the user
//        */
//       if (token.sub && session.user) {
//         session.user.id = token.sub;
//       }

//       if (token.role && session.user) {
//         session.user.role = token.role as UserRole;
//       }

//       return session;
//     },

//     async jwt({ token }) {
//       /**
//        * sending token to the session for role based access
//        */
//       // checking if user is logged in or not because token/session will only be created when user is logged in.
//       if (!token.sub) return token;

//       const existingUser = await getUserById(token.sub);
//       if (!existingUser) return token;
//       // setting up role in token
//       token.role = existingUser.role;

//       return token;
//     },
//   },
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" },
//   ...authConfig,
// });

export const { handlers, auth, signIn, signOut } = NextAuth(async () => {
  const { default: authConfig } = await import("./auth.config"); // <-- dynamic import

  return {
    pages: {
      signIn: "/auth/log-in",
      error: "/auth/error",
      signOut: "/",
    },
    events: {
      async linkAccount({ user }) {
        await db.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() },
        });
      },
    },
    callbacks: {
      async signIn({ user, account }) {
        if (account?.provider !== "credentials") return true;
        const existingUser = await getUserById(user.id!);
        if (!existingUser?.emailVerified) return false;
        return true;
      },
      async session({ token, session }) {
        if (token.sub && session.user) session.user.id = token.sub;
        if (token.role && session.user) session.user.role = token.role as UserRole;
        return session;
      },
      async jwt({ token }) {
        if (!token.sub) return token;
        const existingUser = await getUserById(token.sub);
        if (!existingUser) return token;
        token.role = existingUser.role;
        return token;
      },
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig, // now safely imported
  };
});
