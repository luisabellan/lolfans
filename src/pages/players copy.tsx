import Head from "next/head";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import HeaderMenu from "@/components/HeaderMenu";
import tw, { styled } from "twin.macro";
import { useAtom } from "jotai";
import { isUserLoggedAtom } from "@/atoms/store";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { match } from "assert";

const Main = tw.main`flex flex-col justify-between items-center`;
const Button = tw.button`bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`;
const TextInput = tw(Field)`px-4 py-2 border rounded w-full my-2`;
const ErrorText = tw.span`text-red-500`;
const Header = tw.h2`text-3xl`;
const SummonerInfo = tw.h2`flex flex-col items-start self-center  pt-20`;

interface PlayerInfo {
  id: string;
  name: string;
  profileIconId: string;
  summonerLevel: string;
  puuid: string;
  accountId: string;
  revisionDate: string;
}

interface MatchData {
  // define properties for match data 
  gameId: string;
  gameVersion: string;
  platformId: string;
  gameDuration: number;
  // define properties for match metadata
  mapId: string;
  gameMode: string;
  gameType: string;
  // define properties for match signatures
  champion: string;
  // define properties for match players
  players: PlayerInfo[];

}

type Props = {
  apiKey: string;
};

const Players = (props: Props): JSX.Element => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({} as PlayerInfo);
  const [summonerIcon, setSummonerIcon] = useState("");
  const RIOT_API_KEY = props.apiKey;
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom);
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [matchesIDs, setMatchesIDs] = useState([{}])


  const handleSubmit = async (values: { summonerName: any; }) => {
    try {
      const [summonerRes, matchesIDsRes] = await Promise.all([
        axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${values.summonerName}?api_key=${RIOT_API_KEY}`),
        axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${res.data.puuid}/ids?start=0&count=20&api_key=${RIOT_API_KEY}`)
      ]);

      setPlayerInfo(summonerRes.data);
      setSummonerIcon(`https://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${summonerRes.data.profileIconId}.png`);

      const myMatchesData = await Promise.all(
        matchesIDsRes.data.map((matchID: string) =>
          axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${RIOT_API_KEY}`)
            .then(res => res.data)
            .catch(e => console.log(e))
        )
      );
      setMatches(myMatchesData);
      console.log(matchesIDs)
      console.log(matches)
    } catch (e) {
      console.error(e);
      // alert("Summoner not found");
    }
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

        <SummonerInfo>
          {playerInfo.name && (
            <div tw="flex flex-col items-center">
              <Header tw="text-4xl text-center">{playerInfo.name}</Header>
              <Image width={200} height={200} src={summonerIcon} alt={"Profile Icon"} />
              <div tw="self-start pt-10">
                <p tw="self-start text-2xl">Lvl: {playerInfo.summonerLevel}</p>
                <p tw="self-start text-2xl">Division: {playerInfo.summonerLevel}</p>

              </div>
              <Header tw="text-4xl text-center pt-20">Last 10 matches</Header>
              {
                matches.slice(0, 10).map((match) => (
                  <div key={match.gameId}
                  >
                    <p tw="self-start text-xl">
                      <b>Game #{match.gameId}
                      </b>
                      <br></br>
                      <b>{match.gameVersion}
                      </b>
                      <br></br>
                      <b>{match.champion}
                      </b>
                      <br></br>


                    </p>
                  </div>
                ))
              }

            </div>


          )}


        </SummonerInfo>
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