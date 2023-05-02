import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import HeaderMenu from "@/components/HeaderMenu";
import tw, { styled } from "twin.macro";
import { useAtom } from "jotai";
import { isUserLoggedAtom } from "@/atoms/store";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Import react-dom and react-icons
import { render } from 'react-dom';
import { FaSearch } from 'react-icons/fa';


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
  averageKda: string;
}

type Props = {
  apiKey: string;
};

const Players = (props: Props): JSX.Element => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({} as PlayerInfo);
  const [summonerIcon, setSummonerIcon] = useState("");
  const RIOT_API_KEY = props.apiKey;
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom);
  // Remove initial array argument from setMatches
  const [matches, setMatches] = useState([]);
  const [matchesIDs, setMatchesIDs] = useState([{}]);
  
  // Await the getAverageKda function before rendering the KDA value
  useEffect(() => {
    async function getKda() {
      if (playerInfo.name) {
        const kda = await getAverageKda(playerInfo.name);
        setPlayerInfo((prevState) => ({ ...prevState, averageKda: kda }));
      }
    }
    getKda();
  }, [playerInfo.name]);

  const handleSubmit = async (values: any) => {
    try {
      const summonerById = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${values.summonerName}?api_key=${RIOT_API_KEY}`;
      const res = await axios.get(summonerById);
      const averageKda = getAverageKda(summonerById)
      setPlayerInfo({
        ...res.data,
        averageKda

      });

      const summonerIconUrl = `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${res.data.profileIconId}.png`;
      setSummonerIcon(summonerIconUrl);

      /*  const matchesIDsUrl = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${res.data.puuid}/ids?start=0&count=20&api_key=${RIOT_API_KEY}`;
      const matchesIDsRes = await axios.get(matchesIDsUrl);
      const myMatchesUrls = matchesIDsRes.data.map(
        (matchID: string) => `https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${RIOT_API_KEY}`
      );

      const matchesRes = await Promise.all(myMatchesUrls.map((url: string) => axios.get(url)));
      const myMatchesData = matchesRes.map((res: any) => res.data) as never[];
      setMatches([...myMatchesData]); */
    } catch (e) {
      console.log(e);
      // alert("Summoner not found");
    }
  };

  async function getAverageKda(summonerName: string) {
    const res = await axios.get(`/api/kda?summonerName=${summonerName}`);
    console.log(res.data)
    return res.data;
  }

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
              {/* Add label for text input field */}
              <label htmlFor="summonerName">
                Summoner name
                <TextInput type="text" name="summonerName" id="summonerName"/>
              </label>  
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
                <p tw="self-start text-2xl">Division: {playerInfo.summonerLevel}</p>
                {/* Render the KDA value */}
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
