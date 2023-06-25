import { SessionInterface, UserProfile } from "@/model/global";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { getServerSession } from "next-auth/next";
import GoogleProvieder from "next-auth/providers/google";
import { createUser, getUser } from "./actions";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add providers here
    GoogleProvieder({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );

      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token as string, secret) as JWT;

      return decodedToken;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg    ",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        const data = (await getUser(email)) as { user: UserProfile };
        console.log(`new session`, data);
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error) {
        console.error(error);
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        // get user if they exist
        const userExists = (await getUser(user.email as string)) as {
          user: UserProfile;
        };

        console.log(`user exists`, userExists);

        if (!userExists.user) {
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
