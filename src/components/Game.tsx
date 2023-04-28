import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type GameProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Game: React.FC<{ game: GameProps }> = ({ game }) => {
  const authorName = game.author ? game.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/game/[id]", `/game/${game.id}`)}>
      <h2>{game.title}</h2>
      <small>By {authorName}</small>
      {/* react/no-children-prop */}
      <ReactMarkdown children={game.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Game;