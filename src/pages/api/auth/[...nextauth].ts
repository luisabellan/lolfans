// Importing the NextAuth module, NextAuthOptions type and email & google provider modules from next-auth 
import NextAuth from "next-auth"
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';

// Importing PrismaAdapter and PrismaClient from their respective modules
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

// Creating an instance of PrismaClient
const prisma = new PrismaClient();

// Defining configurations for authentication
const authOptions = {

  // Customizing signin/signout pages 
  /* pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    verifyRequest: '/',
  }, */
  
  providers: [
  
    // Configuring Email Provider with SMTP settings
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
    
    // Configuring Google Provider with Client Id and Secret
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      // redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!, // check if this is only neededd
    }),
   
  ],
   session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60 // 30 days
    },
  
  // Customizing the login page theme
  theme: {
    colorScheme: "light",
  },
  
  // Customizing JWT payload with added user role
  callbacks: {
    async jwt({ token }: { token: Record<string, any> }) {
      token.userRole = "admin";
      return token;
    }
  },
  
  // Using Prisma Adapter for session storage in the database
  adapter: PrismaAdapter(prisma),
};
const authInstance = NextAuth({ 
  ...authOptions,
  callbacks: {
      async session(session: Session, user: User) {
          session.user.id = user.id;
          return session;
      }
  }
})

export default authInstance;

