import NextAuth from 'next-auth';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

const options = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
  clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email',
  },
  redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
};

async function jwtCallback(req: NextApiRequest, token: any) {
  token.userRole = 'admin';
  return token;
}

const authOptions = {
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
    GoogleProvider(options),
  ],
  theme: {
    colorScheme: 'light',
  },
  callbacks: { jwt: jwtCallback },
  adapter: PrismaAdapter(prisma),
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  await NextAuth(req, res, authOptions);
}
