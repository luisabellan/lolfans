import Head from "next/head";
import Link from "next/link";
// import { css, styled } from '@stitches/react';
import tw, { styled } from "twin.macro";

import type * as Stitches from "@stitches/react";

import { SetStateAction, useCallback, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import HeaderMenu from "@/components/HeaderMenu";
// import { Inter } from 'next/font/google'
import styles from "@/styles/Players.module.scss";
import React from "react";

// const inter = Inter({ subsets: ['latin'] })

const headStyle = "text-3xl, font-bold";

export default function Champions() {
  interface ChampInfo {
    id: string;
    name: string;
    title: string;
    stats: string;
    tags: string;
  }

  const [searchText, setSearchText] = useState("");
  const [champs, setChamps] = useState([] as ChampInfo[]);

  const Input = styled("input", {
    color: "red",
    margin: "2rem",
  });

  const ChampionsDiv = styled("div", {});

  const Main = styled("main", {
    display: "flex",
    "flex-direction": "column",
    "justify-content": "space-between",
    "align-items": "center",
    padding: "6rem",
    "min-height": "100vh",
  });

  useEffect(() => {
    getChamps();
    console.log(champs);
  }, []);

  // TODO
  /*   http://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion.json
http://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion/Aatrox.json */
  // const apiCallString = `https://euw1.api.riotgames.com/lol/summoner/v4/champions/by-name/${searchText}?api_key=${API_KEY}`

  const getChamps = (): any => {
    const champions = `http://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion.json`;
    axios
      .get(champions)
      .then((res): any => {
        setChamps(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getChampById = (id : string ): void => {
    const champ = `http://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/${id}.json`;
    axios
      .get(champ)
      .then((res): any => {
        setChamps(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = useCallback((e: any) => {
    setSearchText(e.currentTarget[0].value);
  }, []);

  return (
    <>
      <Head>
        <title>Search campion</title>
        <meta name="description" content="Player search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu />
      <Main>
        <span>Search player</span>
        <form onSubmit={() => getChampById(searchText)}>
          <label htmlFor="searchText">Champion:</label>
          <input type="text" defaultValue={searchText} name="searchText" />
          <button type="submit" tw="bg-blue-600 p-2" onClick={()=>getChampById(searchText)}>
            Search
          </button>
        </form>
        <ChampionsDiv>
          return (
          <ul>
            {champs.map((champ): JSX.Element => {
              return champ ?  (
                <li key={champ.id}>
                  <span>Champion: {champ.id}</span>
                  <span>Champion: {champ.name}</span>
                  <span>Champion: {champ.title}</span>
                  <span>Champion: {champ.stats}</span>
                  <span>Champion: {champ.tags}</span>
                </li>
              ) : <span>Not found</span>
            })}
          </ul>
          );
        </ChampionsDiv>
      </Main>
    </>
  );
}
