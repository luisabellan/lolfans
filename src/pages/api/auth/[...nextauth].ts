import NextAuth from 'next-auth'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import EmailProvider from 'next-auth/providers/email'

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.NEXT_PUBLIC_EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 10 * 60, // Magic links are valid for 10 min only
    }),
  ],
  adapter: PrismaAdapter(prisma),
});