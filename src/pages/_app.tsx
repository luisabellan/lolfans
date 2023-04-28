import { AppProps } from "next/app";
import { trpc } from "@/lib/trpc";
import GlobalStyles from "@/styles/GlobalStyles";
import { Provider as StateProvider } from "jotai";
import { SessionProvider as AuthProvider } from "next-auth/react";

interface MyAppProps extends AppProps {
  session: any; // Replace 'any' with your custom session type
}

function MyApp({ Component, pageProps, session }: MyAppProps) {
  return (
    <AuthProvider session={session}>
      <StateProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </StateProvider>
    </AuthProvider>
  );
}

export default trpc.withTRPC(MyApp);
