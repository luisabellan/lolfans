import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth/types';

import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

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
      // redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!, // check if this is only neededd
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({token}) {
      token.userRole = "admin"
      return token
    },
  },
  
  adapter: PrismaAdapter(prisma),
}

export default NextAuth(authOptions);
