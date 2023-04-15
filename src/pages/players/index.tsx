import Head from "next/head";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import HeaderMenu from "@/components/HeaderMenu";
import tw, { styled } from "twin.macro";
import { useAtom } from "jotai";
import {isUserLoggedAtom} from "@/atoms/store";



const Main = tw.main`flex flex-col justify-between items-center`;
const Header = tw.h1`text-3xl font-bold`;
const Button = tw.button`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`;
const Form = tw.form`flex flex-col`;


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
  onChange: (value: string) => void;
  value: string;
};

const TextInput = ({ value, onChange }: Props) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return <input type="text" value={value} onChange={handleInputChange} />;
};

const Players = (props: { apiKey: string, isUserLogged: boolean }): JSX.Element => {
  const [searchText, setSearchText] = useState("");
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({} as PlayerInfo);
  const RIOT_API_KEY = props.apiKey;
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom);

  const handleTextChange = (value: string) => {
    setSearchText(value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    searchPlayer();
  };


  const searchPlayer = () => {
    // Info: {"id":"Mp_5IltAtKpEmO43FbIXlsbXf_IjTTSdkKUYTe_Zg3gr_CGggUAxXyjWfw","accountId":"t0_hcYtYJXaF2-kasNEb8iFBZAmcg3FAP4QOzVXWqwUna-Brff-MJNBU","puuid":"XPTHQKgRrnjyQCdwGKha88zxxZGAO1kkp_q3LlecYJpJW4svqnNpNOb81elE95Uhyi2OTsAEe5mcrg","name":"Fionnatad","profileIconId":5645,"revisionDate":1680693795000,"summonerLevel":75}

    const apiCallString = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchText}?api_key=${RIOT_API_KEY}`;
    axios
      .get(apiCallString)
      .then((res) => {
        console.log(res.data);
        setPlayerInfo(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };



  return (
    <>
      <Head>
        <title>Search player</title>
        <meta name="description" content="Player search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu isUserLogged={false} />

      <Main>
        <Header>Search summoner</Header>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="searchText">Summoner:</label>
          <TextInput value={searchText} onChange={handleTextChange} />
          
          <Button type="submit" tw="">
            Search
          </Button>
        </Form>


        {/* <span>Info: {JSON.stringify(playerInfo)}</span>
        <span>name: {playerInfo.name}</span>
        <span>accountId: {playerInfo.accountId}</span>
        <span>id: {playerInfo.id}</span>
        <span>puuid: {playerInfo.puuid}</span>
        <span>profileIconId: {playerInfo.profileIconId}</span>
        <span>revisionDate: {playerInfo.revisionDate}</span>
        <span>summonerLevel: {playerInfo.summonerLevel}</span> */}


      </Main>
    </>
  );
};

export default Players;

export async function getStaticProps() {
  return {
    props: {
      apiKey: process.env.NEXT_PUBLIC_RIOT_API_KEY ?? "",
    },
  };
}
