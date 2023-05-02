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
  division: string;
  averageKda: number;
}

interface KdaStats {
  kills: number;
  deaths: number;
  assists: number;
}

type Props = {
  apiKey: string;
};

const Players = (props: Props): JSX.Element => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({} as PlayerInfo);
  const [summonerIcon, setSummonerIcon] = useState("");
  const RIOT_API_KEY = props.apiKey;
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom);
  const [matches, setMatches] = useState([])
  const [matchesIDs, setMatchesIDs] = useState([{}])


  /*  const handleSubmit = async (values: any) => {
     try {
       const summonerById = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${values.summonerName}?api_key=${RIOT_API_KEY}`;
       const res = await axios.get(summonerById);
       setPlayerInfo(res.data);
   
       const summonerIconUrl = `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${res.data.profileIconId}.png`;
       setSummonerIcon(summonerIconUrl);
   
       const matchesIDsUrl = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${res.data.puuid}/ids?start=0&count=20&api_key=${RIOT_API_KEY}`;
       const matchesIDsRes = await axios.get(matchesIDsUrl);
       const myMatchesUrls = matchesIDsRes.data.map(
         (matchID: string) => `https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${RIOT_API_KEY}`
       );
   
       const matchesRes = await Promise.all(myMatchesUrls.map((url: string) => axios.get(url)));
       const myMatchesData = matchesRes.map((res: any) => res.data) as never[];
       setMatches([...myMatchesData]);
     } catch (e) {
       console.log(e);
       // alert("Summoner not found");
     }
   }; */

  async function getDivision(summonerId: string, apiKey: string) {
    try {
      const response = await axios.get(
        `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`
      );
      const { tier, rank } = response.data[0];
      return `${tier} ${rank}`;
    } catch (error) {
      console.error(error);
    }
  }

  async function getAverageKda(summonerName: string): any {
    const kdaStats: KdaStats[] = await fetch(`/api/kda/${summonerName}`)
      .then(response => response.json())
      .catch(error => console.error(error));
  
    if (!kdaStats || kdaStats.length === 0) {
      throw new Error(`No KDA stats found for summoner name ${summonerName}`);
    }
  
    const totalKills = kdaStats.reduce((sum, stats) => sum + stats.kills, 0);
    const totalDeaths = kdaStats.reduce((sum, stats) => sum + stats.deaths, 0);
    const totalAssists = kdaStats.reduce((sum, stats) => sum + stats.assists, 0);
  
    const averageKda = (totalKills + totalAssists) / totalDeaths;
  
    return averageKda;
  }


 

 
 const handleSubmit = async (values: { summonerName: string }): Promise<void> => {
   try {
     const summonerById = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${values.summonerName}?api_key=${process.env.RIOT_API_KEY}`;
     const res = await axios.get<PlayerInfo>(summonerById);
     const playerData = res.data;
 
     const summonerIconUrl = `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${playerData.profileIconId}.png`;
     setSummonerIcon(summonerIconUrl);
 
     const division = await getDivision(playerData.id, process.env.RIOT_API_KEY || "");
     const playerInfoWithDivision = { ...playerData, division: division || '' };
 
     /* const averageKda = await getAverageKda(playerData.name);
     const playerInfoWithAverageKda = { ...playerInfoWithDivision, averageKda: averageKda || 0 };
 
     setPlayerInfo(playerInfoWithAverageKda); */

     setPlayerInfo(playerInfoWithDivision)
   } catch (error) {
     console.error(error);
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

        <SummonerInfo tw=" ">
          {playerInfo.name && (
            <div tw="flex flex-col items-center">
              <Header tw="text-4xl text-center">{playerInfo.name}</Header>
              <Image width={200} height={200} src={summonerIcon} alt={"Profile Icon"} />
              <div tw="self-start pt-10">
                <p tw="self-start text-2xl">Lvl: {playerInfo.summonerLevel}</p>
                <p tw="self-start text-2xl">Division: {playerInfo.division}</p>
                <p tw="self-start text-2xl">KDA: {playerInfo.averageKda}</p>

              </div>
              <Header tw="text-4xl text-center pt-20">Last 10 matches</Header>
              {console.log(matchesIDs)}
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
