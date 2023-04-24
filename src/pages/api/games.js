export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { image, title, description } =
        req.body;

      const game = await prisma.game.create({
        data: {
          image,
          title,
          description,
        },
      });
      res.status(200).json(game);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
