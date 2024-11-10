import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import DbService from "./lib/DbService";
import { verifyPassword } from "./utils/password";




export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},

      },

      authorize: async (credentials) => {
        try {
          if (!credentials.email || !credentials.password) {
            throw new AuthError("Email and password are required.");
          }

          const dbService = DbService.getInstance();
          const user = await dbService.getUserByEmail(credentials.email);


          if (!user || !user.password) {
            throw new AuthError("User not found or invalid credentials.");
          }

          const isPasswordValid = await verifyPassword(credentials.password, user.password);
          if (!isPasswordValid) {
            throw new AuthError("Incorrect Password, Please try again");
          }
          return user;
        } catch (error) {
          if (error instanceof AuthError) {
            throw error;
          }
          throw new AuthError("An unexpected error occurred.");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Extending the session object to include user id
      const dbService = DbService.getInstance();
      const dbUser = await dbService.getUserByEmail(token.email);

      if (dbUser) {
        session.user.id = dbUser.id;
      }

      return session;
    },
  },
});
