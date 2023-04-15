import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import tw, { styled } from "twin.macro";
import { css } from "@emotion/react";

// import { Inter } from 'next/font/google'
import HeaderMenu from "@/components/HeaderMenu";
import Welcome from "@/components/Welcome";
import { useAtom } from "jotai";
import {isUserLoggedAtom} from "@/atoms/store";
// const inter = Inter({ subsets: ['latin'] })

const Header = tw.h1`text-3xl font-bold`;
const Main = tw.main`flex flex-col justify-between items-center p-24 min-h-screen`;

export default function Home() {
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom);

  return (
    <>
      <Head>
        <title>LoLFans</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderMenu isUserLogged={loggedIn} />

      <Welcome isUserLogged={loggedIn} username={"Montse"} />
    </>
  );
}
