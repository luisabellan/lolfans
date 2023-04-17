import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import tw, { styled } from "twin.macro";
import { css } from "@emotion/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { trpc } from "@/utils/trpc";

// import { Inter } from 'next/font/google'

import { useAtom } from "jotai";
import { isUserLoggedAtom, userNameAtom } from "@/atoms/store";
// const inter = Inter({ subsets: ['latin'] })
import Layout from "@/components/Layout";
import Grid from "@/components/Grid";
import games from "./data.json"; // mock data, we will not need this once we have data in the database
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  // Get all games
  const games = await prisma.game.findMany();
  // Pass the data to the Games page
  return {
    props: {
      games: JSON.parse(JSON.stringify(games)),
    },
  };
}

export default function Home({ games = [] }) {
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom);
  const [userName, setUserName] = useAtom(userNameAtom);

  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
  const result = trpc.hello.useQuery({ text: "client" });

  return (
    <Layout userName={userName} isUserLogged={loggedIn}>
      <h1 className="text-xl font-medium text-gray-800">
        Top-rated matches to watch. Pick your favorites!
      </h1>
      <p className="text-gray-500">Explore some of the matches in the world</p>
      <div className="mt-8">
        <Grid games={games} />
      </div>
      {/**
       * The type is defined and can be autocompleted
       * 💡 Tip: Hover over `data` to see the result type
       * 💡 Tip: CMD+Click (or CTRL+Click) on `text` to go to the server definition
       * 💡 Tip: Secondary click on `text` and "Rename Symbol" to rename it both on the client & server
       

       {result.data ? (<h2>{result.data.greeting}</h2>) : (<h2>Loading...</h2>)}
      */}
    </Layout>
  );
}
