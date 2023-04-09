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

interface TextInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
const Main = tw.div`flex flex-col justify-between items-center p-24 min-h-screen`;

const Players = (props: { apiKey: string }): JSX.Element => {
  const [text, setText] = useState("");
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({} as PlayerInfo);
  const API_KEY = props.apiKey;

  const handleTextChange = (value: string) => {
    setText(value);
  };

  const searchPlayer = () => {
    const apiCallString = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${text}?api_key=${API_KEY}`;
    axios
      .get(apiCallString)
      .then((res) => {
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
        <form onSubmit={searchPlayer}>
          <label htmlFor="searchText">Summoner:</label>
          <TextInput value={text} onChange={handleTextChange} />
          <p>{`You typed: ${text}`}</p>
          <button type="submit" tw="bg-blue-600 p-2">
            Search
          </button>
        </form>
        <span>Info: {JSON.stringify(playerInfo)}</span>
        <span>Summoner: {playerInfo.name}</span>
        <span>Level: {playerInfo.summonerLevel}</span>
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
