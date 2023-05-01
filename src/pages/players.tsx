import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import HeaderMenu from "@/components/HeaderMenu";
import tw, { styled } from "twin.macro";
import { useAtom } from "jotai";
import {isUserLoggedAtom} from "@/atoms/store";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Main = tw.main`flex flex-col justify-between items-center`;
const Button = tw.button`bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`;
const TextInput = tw(Field)`px-4 py-2 border rounded w-full my-2`;
const ErrorText = tw.span`text-red-500`;

interface PlayerInfo {
  id: string;
  name: string;
  profileIconId: string;
  summonerLevel: string;
  puuid: string;
  accountId: string;
  revisionDate: string;
}

type Props = {
  apiKey: string;
};

const Players = (props: Props): JSX.Element => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({} as PlayerInfo);
  const [summonerIcon, setSummonerIcon] = useState("");
  const RIOT_API_KEY = props.apiKey;
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom);

  const handleSubmit = async(values: any) => {
    const summonerById = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${values.summonerName}?api_key=${RIOT_API_KEY}`;
    
    axios
    .get(summonerById)
    .then((res) => {
      setPlayerInfo(res.data);
    })
    .catch((e) => {
      console.log(e);
      alert("Summoner not found");
    });
    
    await setSummonerIcon(`https://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${playerInfo.profileIconId}.png`);
      
  };


 

  const playerSchema = Yup.object().shape({
    summonerName: Yup.string()
      .required("Please type in a summoner name")
      .matches(/^[0-9a-zA-Z _]+$/, "Alphanumeric characters and spaces only"),
  });

  return (
    <>
      <Head>
        <title>Search player</title>
        <meta name="description" content="Player search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu isUserLogged={loggedIn} />

      <Main>
        <h1 tw="text-3xl font-bold mt-16">Search summoner</h1>
        <Formik
          initialValues={{
            summonerName: "",
          }}
          validationSchema={playerSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              <TextInput type="text" name="summonerName" />
              {errors.summonerName && touched.summonerName ? (
                <ErrorText>{errors.summonerName}</ErrorText>
              ) : null}

              <Button type="submit">
                Search
              </Button>
            </Form>
          )}
        </Formik>

        <div>
          {playerInfo.name && (
            <>
              <p>{playerInfo.name}</p>
              <Image width={50} height={50} src={summonerIcon} alt={"Profile Icon"} />
              <p>Lvl: {playerInfo.summonerLevel}</p>
              <p>KDA: {playerInfo.summonerLevel}</p>
              <p>Division: {playerInfo.summonerLevel}</p>
            </>
          )}
        </div>
      </Main>
    </>
  );
};

export default Players;

export async function getStaticProps() {
  return {
    props: {
      apiKey: process.env.RIOT_API_KEY ?? "",
    },
  };
}
