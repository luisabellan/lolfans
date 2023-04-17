// pages/games/[id].js

import { useRouter } from "next/router";

import Image from "next/image";
import Layout from "@/components/Layout";
import { PrismaClient } from "@prisma/client";

// Instantiate Prisma Client
const prisma = new PrismaClient();

const ListedGame = (game = null) => {
  // Retrieve the Next.js router
  const router = useRouter();
  // Fallback version
  if (router.isFallback) {
    return "Loading...";
  }
// Return full page
  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {game?.title ?? ""}
            </h1>
            {/* <ol className="inline-flex items-center space-x-1 text-gray-500">
              <li>
                <span>{game?.guests ?? 0} guests</span>
                <span aria-hidden="true"> · </span>
              </li>
              <li>
                <span>{game?.beds ?? 0} beds</span>
                <span aria-hidden="true"> · </span>
              </li>
              <li>
                <span>{game?.baths ?? 0} baths</span>
              </li>
            </ol> */}
          </div>
        </div>

        <div className="mt-6 relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg shadow-md overflow-hidden">
          {game?.image ? (
            <Image
              src={game.image}
              alt={game.title}
              layout="fill"
              objectFit="cover"
            />
          ) : null}
        </div>

        <p className="mt-8 text-lg">{game?.description ?? ""}</p>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Get all the games IDs from the database
  const games = await prisma.game.findMany({
    select: { id: true },
  });

  return {
    paths: games.map((game) => ({
      params: { id: game.id },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Get the current game from the database
  const game = await prisma.game.findUnique({
    where: { id: params.id },
  });

  if (game) {
    return {
      props: JSON.parse(JSON.stringify(game)),
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default ListedGame;
