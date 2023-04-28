import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import AuthModal from "./AuthModal";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useSession, signOut } from "next-auth/react";
import HeaderMenu from "./HeaderMenu";
import Welcome from "./Welcome";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>LoLFans</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderMenu />

      {/**
           * The type is defined and can be autocompleted
           * 💡 Tip: Hover over `data` to see the result type
           * 💡 Tip: CMD+Click (or CTRL+Click) on `text` to go to the server definition
           * 💡 Tip: Secondary click on `text` and "Rename Symbol" to rename it both on the client & server
           
    
           {result.data ? (<h2>{result.data.greeting}</h2>) : (<h2>Loading...</h2>)}
        */}
      <main>{children}</main>
    </>
  );
}
