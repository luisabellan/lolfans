import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  // Check if user is authenticated
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  // Retrieve the authenticated user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { listedGames: true },
  });

  // Check if authenticated user is the owner of this game
  const { id } = req.query;
  if (!user?.listedGames?.find(game => game.id === id)) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  // Update game
  if (req.method === 'PATCH') {
    try {
      const game = await prisma.game.update({
        where: { id },
        data: req.body,
      });
      res.status(200).json(game);
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const game = await prisma.game.delete({
        where: { id },
      });
      // Remove image from Supabase storage
      if (game.image) {
        const path = game.image.split(`${process.env.SUPABASE_BUCKET}/`)?.[1];
        await supabase.storage.from(process.env.SUPABASE_BUCKET).remove([path]);
      }
      res.status(200).json(game);
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader('Allow', ['PATCH', 'DELETE']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
