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
        <meta name="description" content="League of Legends Fan Site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderMenu />

      <main className="pt-8">{children}</main>
        
    </>

    
  );
}
