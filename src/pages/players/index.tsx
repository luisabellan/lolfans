import Head from "next/head";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import HeaderMenu from "@/components/HeaderMenu";
import tw, { styled } from "twin.macro";

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
const Main = tw.main`flex flex-col justify-between items-center p-24 min-h-screen`;

const Players = (props: { apiKey: string }): JSX.Element => {
  const [searchText, setSearchText] = useState("");
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({} as PlayerInfo);
  const RIOT_API_KEY = props.apiKey;

  const handleTextChange = (value: string) => {
    setSearchText(value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    searchPlayer();
  };

  const searchPlayer = () => {
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
      <HeaderMenu />

      <Main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="searchText">Summoner:</label>
          <TextInput value={searchText} onChange={handleTextChange} />
          <p>{`You typed: ${searchText}`}</p>
          <button type="submit" tw="bg-blue-600 p-2">
            Search
          </button>
        </form>
        <span>Info: {JSON.stringify(playerInfo)}</span>
        <span>name: {playerInfo.name}</span>
        <span>accountId: {playerInfo.accountId}</span>
        <span>id: {playerInfo.id}</span>
        <span>puuid: {playerInfo.puuid}</span>
        <span>profileIconId: {playerInfo.profileIconId}</span>
        <span>revisionDate: {playerInfo.revisionDate}</span>
        <span>summonerLevel: {playerInfo.summonerLevel}</span>
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
