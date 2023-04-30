import Layout from "@/components/Layout";
import ListingForm from "@/components/ListingForm";
import { Game } from "@prisma/client";
import axios from "axios";

const Create = () => {
  const addGame = (data: Game) => axios.post("/api/games", data);

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">List your game</h1>
        <p className="text-gray-500">
          Fill out the form below to list a new game.
        </p>
        <div className="mt-8">
         <ListingForm
           buttonText="Add game"
           redirectPath="/"
           onSubmit={addGame}

         />
         
        </div>
      </div>
    </Layout>
  );
};

export default Create;
