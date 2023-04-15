import { AppProps } from "next/app";
import GlobalStyles from "@/styles/GlobalStyles";
import { Provider } from "jotai";

import React from "react";

const App = ({ Component, pageProps }: AppProps) => {
  <GlobalStyles />;
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
