import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import games from './data.json'; // mock data, we will not need this once we have data in the database
import { prisma } from '@/lib/prisma';

export async function getServerSideProps() {
  // Get all games
  const games = await prisma.game.findMany(); // TODO: Uncomment once we have games in the database
  // Pass the data to the Games page
  return {
    props: {
      games: JSON.parse(JSON.stringify(games)),
    },
  };
}

export default function Home({ games = [] }) {
  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">
        Top-rated places to stay
      </h1>
      <p className="text-gray-500">
        Explore some of the best places in the world
      </p>
      <div className="mt-8">
        <Grid games={games} />
      </div>
    </Layout>
  );
}