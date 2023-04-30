import { AppProps } from "next/app";
import { trpc } from "@/lib/trpc";
import GlobalStyles from "@/styles/GlobalStyles";
import { Provider as StateProvider } from "jotai";
import { SessionProvider as AuthProvider } from "next-auth/react";
import { withTRPC } from "@trpc/next";


function MyApp({ Component, pageProps, session }) {
  return (
    <AuthProvider session={session}>
      <StateProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </StateProvider>
    </AuthProvider>
  );
}

export default withTRPC(MyApp);

