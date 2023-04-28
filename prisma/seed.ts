import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getSession } from 'next-auth/client';

// Import types
import { Session } from 'next-auth';
import { GameProps, FormattedDraft } from '@/types';

export const getServerSideProps: GetServerSideProps = async ({ req, res }: GetServerSidePropsContext<ParsedUrlQuery>) => {

  // Fetch drafts and format them as GameProps[]
  const rawDrafts = await fetch(`/api/drafts?secret=${process.env.UPLOADER_SECRET}`);
  const drafts: FormattedDraft[] = await rawDrafts.json();

  const games: GameProps[] = drafts.map((draft) => {
    let game: GameProps = {
      id: draft.id,
      title: draft.title,
      description: draft.description,
      image: draft.image,
      published: !!draft.published,
      // add your other properties here
    };
    return game;
  });

  // Fetch session
  const session = await getSession({ req });

  return {
    props: {
      games,
      session,
    },
  };
};
