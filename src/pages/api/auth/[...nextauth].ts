import NextAuth, { NextAuthOptions } from 'next-auth';


import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
const options = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
  clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
  authorizationParams: {
    response_type: "code",
    scope: "openid profile email",
  },
  redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!
}


interface AuthorizationConfig {
  response_type: string;
  scope: string;
}

export const authOptions: NextAuthOptions = {
  /* pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    verifyRequest: '/',
  }, */

  providers: [
    EmailProvider({
      server: {
        host: process.env.NEXT_PUBLIC_EMAIL_SERVER_HOST!,
        port: parseInt(process.env.NEXT_PUBLIC_EMAIL_SERVER_PORT!),
        auth: {
          user: process.env.NEXT_PUBLIC_EMAIL_SERVER_USER!,
          pass: process.env.NEXT_PUBLIC_EMAIL_SERVER_PASSWORD!,
        },
      },
      from: process.env.NEXT_PUBLIC_EMAIL_FROM!,
      maxAge: 10 * 60, // Magic links are valid for 10 min only
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      authorization: {
        response_type: "code",
        scope: "openid profile email",
      } as AuthorizationConfig,
      redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },

  adapter: PrismaAdapter(prisma),
}

export default NextAuth(authOptions);
