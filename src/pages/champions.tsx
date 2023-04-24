import {
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
} from "react";

import Head from "next/head";
import Link from "next/link";
import tw, { styled } from "twin.macro";
import { css } from "@emotion/react";

import axios from "axios";
import Image from "next/image";
import HeaderMenu from "@/components/HeaderMenu";

const headStyle = tw.h1`text-3xl font-bold`;
const Main = tw.main`flex flex-col justify-between items-center`;
const Header = tw.h1`text-3xl font-bold`;
const Form = tw.form`flex flex-col`;
const Label = tw.label`text-sm`;
const Input = tw.input`border-2 border-gray-300 p-2 rounded-md`;
const Button = tw.button`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`;

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

interface Champ {
  id: string;
  name: string;
  title: string;
  stats: {};
  tags: [];
  image: {
    full: string;
  };
  blurb: string;
  lore: string;
}

export default function Champions() {
  const [searchText, setSearchText] = useState("");
  const [champ, setChamp] = useState<Champ | null>(null);

  const handleSubmit = (event: { target: any; preventDefault: () => void }) => {
    event.preventDefault();
    getChampByName(searchText);
  };

  const handleTextChange = (value: string) => {
    setSearchText(value);
  };

  const formatName = (name: string): string => {
    const [firstName, lastName] = name.split(" ");

    if (lastName) {
      const output = capitalize(firstName) + capitalize(lastName);
      return output;
    }

    return capitalize(name);
  };

  const capitalize = (word: string): string =>
    `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;

  const getChampByName = async (name: string) => {
    const formattedName = formatName(name);
    const champData = `http://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion/${formattedName}.json`;

    try {
      const res = await axios.get(champData);
      setChamp(res.data.data[formattedName]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Head>
        <title>Search champion</title>
        <meta name="description" content="Champion search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu />
      <Main>
        <Header>Search champion</Header>
        <Form onSubmit={handleSubmit}>
          <TextInput value={searchText} onChange={handleTextChange} />
          <Button type="submit">Search</Button>
        </Form>
        {champ ?  (
          <ul>
            <li>Id: {champ.id}</li>
            <li>Name: {champ.name}</li>
            <li>Title: {champ.title}</li>
          </ul>
        ) : null}
      </Main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      apiKey: process.env.NEXT_PUBLIC_RIOT_API_KEY ?? "",
    },
  };
}
