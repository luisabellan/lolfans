import { AppProps } from "next/app";
import type { AppType } from "next/app";
import { trpc } from "@/lib/trpc";
import GlobalStyles from "@/styles/GlobalStyles";
import { Provider as StateProvider } from "jotai";
import { Provider as AuthProvider } from "next-auth/client";

function App({ Component, pageProps }: AppProps) {
  // Changed function signature
  return (
    <AuthProvider session={pageProps.session}>
      <StateProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </StateProvider>
    </AuthProvider>
  );
}

export default trpc.withTRPC(App);
