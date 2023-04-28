import React from "react";
import { GetServerSideProps } from "next";
import Layout from "@/components/Layout";
import Game, { GameProps } from "@/components/Game";
import { useSession, getSession } from "next-auth/react";
import prisma from '@/lib/prisma'

type Props = {
  drafts: GameProps[];
  session: any; // replace 'any' with the actual type of the session object
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
  const session = await getSession({ req });

  try {
    const drafts = await prisma.game.findMany({
      where: {
        author: { email: session?.user?.email },
        published: false,
      },
      include: { author: true },
    });

    interface Draft {
      id: any; 
      title: any;
      content: any; 
      author: { 
        name: any; 
        email: any; };
    }

    interface FormattedDraft { 
        id: any; 
        title: any; 
        content: any; 
        author: { 
          name: any; 
          email: any; 
        }; 
    }

    const formattedDrafts = drafts.map((draft: Draft): FormattedDraft => {
      return {
        id: draft.id,
        title: draft.title,
        content: draft.content,
        author: {
          name: draft.author.name,
          email: draft.author.email,
        },
      };
    });

    return { props: { drafts: formattedDrafts, session } };
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    return { props: { drafts: [], session: null } };
  }
};

const Drafts: React.FC<Props> = ({ drafts, session }) => {
  const { data } = useSession();

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        {(!data && !session) ? (
          <div>You need to be authenticated to view this page.</div>
        ) : (
          <main>
            <React.Fragment>
              {drafts.map((game) => (
                <Game key={game.id} game={game} />
              ))}
            </React.Fragment>
          </main>
        )}
      </div>
      <style jsx>{/* .. */}</style>
    </Layout>
  );
};

export default Drafts;
