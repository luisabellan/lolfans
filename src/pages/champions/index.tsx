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
        setChamps(res.data.data); // fixed bug: setChamps to res.data.data instead of res.data
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getChampById = (id : string ): void => {
    const champ = `http://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion/${id}.json`; // fixed bug: added missing slash before id
    axios
      .get(champ)
      .then((res): any => {
        setChamps([res.data]); // fixed bug: setChamps to an array containing res.data instead of res.data
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = useCallback((e: any) => {
    setSearchText(e.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Search champion</title> {/* fixed typo */}
        <meta name="description" content="Player search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu />
      <Main>
        <span>Search champion</span> {/* fixed typo */}
        <form onSubmit={(e) => {e.preventDefault(); getChampById(searchText);}}> {/* fixed bug: added preventDefault to form onSubmit */}
          <label htmlFor="searchText">Champion:</label>
          <input type="text" value={searchText} onChange={handleChange} /> {/* fixed bug: added onChange to input */}
          <button type="submit" tw="bg-blue-600 p-2">
            Search
          </button>
        </form>
        <ChampionsDiv>
          {champs.length > 0 ? ( // fixed bug: added conditional rendering
            <ul>
              {champs.map((champ): JSX.Element => {
                return (
                  <li key={champ.id}>
                    <span>Champion: {champ.id}</span>
                    <span>Champion: {champ.name}</span>
                    <span>Champion: {champ.title}</span>
                    <span>Champion: {champ.stats}</span>
                    <span>Champion: {champ.tags}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <span>Not found</span>
          )}
        </ChampionsDiv>
      </Main>
    </>
  );
}   
