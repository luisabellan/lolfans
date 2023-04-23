import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import tw, { styled } from "twin.macro";
import { css } from "@emotion/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { trpc } from "@/utils/trpc";
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
// import { Inter } from 'next/font/google'
import HeaderMenu from "@/components/HeaderMenu";
import Welcome from "@/components/Welcome";
import { useAtom, atom} from "jotai";
import { isUserLoggedAtom, userNameAtom} from "@/atoms/store";
// const inter = Inter({ subsets: ['latin'] })
import Post, { PostProps } from "@/components/Post";

export default function Home({games = [], posts = []}) {
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom);
  const [name, setName] = useAtom(userNameAtom);
  const { data } = useSession()

  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
  const result = trpc.hello.useQuery({ text: "client" });

  return (
    <Layout>
      <Welcome isUserLogged={loggedIn} userName={name} />
      <div className="mt-8">
        <Grid games={games} />
        {posts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
      </div>
    </Layout>
  );
}
