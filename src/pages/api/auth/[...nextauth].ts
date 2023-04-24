import NextAuth from 'next-auth';
import { NextApiHandler } from 'next';
import Providers from 'next-auth/providers';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, {
  providers: [
    Providers.Email({
      server: {
        host: process.env.NEXT_PUBLIC_EMAIL_SERVER_HOST,
        EMAIL_SERVER_HOST,
        port: Number(process.env.NEXT_PUBLIC_EMAIL_SERVER_PORT),
        auth: {
          user: process.env.NEXT_PUBLIC_EMAIL_SERVER_USER,
          pass: process.env.NEXT_PUBLIC_EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.NEXT_PUBLIC_EMAIL_SERVER_FROM
    }),
    Providers.Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    })
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // Add access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    }
  },
});

export default authHandler;
