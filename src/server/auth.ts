import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db";
import { UserRole } from "@prisma/client";
import { getUserRole } from "./action";
import { PrismaAdapter } from "@auth/prisma-adapter";

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    role?: UserRole;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    // Add your additional properties here:
    role?: UserRole;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [Google],
  callbacks: {
    async session({ session, user }) {
      session.user.role = await getUserRole(user.email);
    },

    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
