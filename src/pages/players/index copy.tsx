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

const Players = (props: { apiKey: string }): JSX.Element => {
  const [text, setText] = useState('');
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({} as PlayerInfo);
  const API_KEY = props.apiKey;

  const Input = styled("input", {
    color: "red",
    margin: "2rem",
  });

  const Main = styled("main", {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6rem",
    minHeight: "100vh",
  });

 

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
        <span>Search player</span>
        <form onSubmit={searchPlayer}>
          <label htmlFor="searchText">Summoner:</label>
          <TextInput value={text} onChange={handleTextChange} />          
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

export async function getStaticProps() {
  return {
    props: {
      apiKey: process.env.API_KEY ?? "",
    },
  };
}

export default Players;
