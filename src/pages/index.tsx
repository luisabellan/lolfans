import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import tw, { styled } from "twin.macro";
import { css } from "@emotion/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { trpc } from "@/lib/trpc";
import Layout from "@/components/Layout";
import Grid from "@/components/Grid";
/// import games from "./data.json"; // mock data, we will not need this once we have data in the database
// import { Inter } from 'next/font/google'
import HeaderMenu from "@/components/HeaderMenu";
import Welcome from "@/components/Welcome";
import { useAtom, atom} from "jotai";
import AuthModal from "@/components/AuthModal";
import { isUserLoggedAtom, userNameAtom} from "@/atoms/store";
// const inter = Inter({ subsets: ['latin'] })
import Game, { GameProps } from "@/components/Game";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  // Get all games
  const games = await prisma.game.findMany();
  // Pass the data to the Games page
  return {
    props: {
      games: games,
    },
  };
}

type Game = {
  id: number;
  title: string;
  description: string;
  published: boolean;
  author: {
    connect: { id: number };
  };
}


type ChildFunction = () => React.ReactNode;

type HomeProps = {
  games: Game[];
  children?: ChildFunction;
}

export default function Home({ games = [], children }: HomeProps) {
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom);
  const [name, setName] = useAtom(userNameAtom);
  const [showModal, setShowModal] = useState(false);


  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { data } = useSession()
  
  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
  const result = trpc.hello.useQuery({ text: "client" });
  
  function onClose(): null {
    closeModal();
    return null;
  }

  return (
    <Layout>
      <main className="flex-grow container mx-auto">
        <div className="px-4 py-12">
          {children && typeof children === 'function' ? children() : <Welcome isUserLogged={false} userName={""} />}
        </div>
      </main>
     
      <AuthModal show={showModal} onClose={onClose} />
      
      {/* <div className="mt-8">
        <Grid games={games} />
        {games.map((game) => (
            <div key={game.id} className="game">
              <Game game={game} />
            </div>
          ))}
      </div> */}
    </Layout>
  );
}
