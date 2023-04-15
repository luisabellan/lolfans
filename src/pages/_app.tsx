import { AppProps } from 'next/app';
import GlobalStyles from "@/styles/GlobalStyles";
import { Provider as StateProvider } from "jotai";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }: AppProps) { // Changed function signature
  return (
    <StateProvider>
      <SessionProvider session={pageProps.session}>
        <GlobalStyles />;
        <Component {...pageProps} />
      </SessionProvider>
    </StateProvider>
  );
};


export default App;
