import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import tw, { styled } from "twin.macro";
import { css } from "@emotion/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import Layout from "@/components/Layout";
// import { Inter } from 'next/font/google'
import HeaderMenu from "@/components/HeaderMenu";
import Welcome from "@/components/Welcome";
import { useAtom, atom} from "jotai";
import { isUserLoggedAtom, userNameAtom} from "@/atoms/store";
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom);
  const [name, setName] = useAtom(userNameAtom);

  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
  const result = trpc.hello.useQuery({ text: "client" });

  return (
    <Layout isUserLogged={loggedIn} >
      <Welcome isUserLogged={loggedIn} userName={name} />
    </Layout>
  );
}
