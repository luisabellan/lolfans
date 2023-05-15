import React from "react";
import Head from "next/head";

import HeaderMenu from "./HeaderMenu";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>LoLFans</title>
        <meta name="description" content="League of Legends Fan Site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderMenu isUserLogged />

      <main className="pt-8">{children}</main>
        
    </>
  );
}
