import { AppProps } from "next/app";
import GlobalStyles from "@/styles/GlobalStyles";

import React from "react";

const App = ({ Component, pageProps }: AppProps) => {
  <GlobalStyles />;
  return <Component {...pageProps} />;
};

export default App;
