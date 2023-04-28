import Head from "next/head";
import Link from "next/link";

import tw, { styled } from "twin.macro";

import { SetStateAction, ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import HeaderMenu from "@/components/HeaderMenu";
// import { Inter } from 'next/font/google'
import React from "react";
import { Configuration, OpenAIApi } from "openai";
import { useAtom } from "jotai";
import {isUserLoggedAtom} from "@/atoms/store";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// const inter = Inter({ subsets: ['latin'] })

const headStyle = "text-3xl, font-bold";

interface ImageResponse {
  data: {
    url: string;
  }[];
}

interface TextInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

type Props = {
  onChange: (value: string) => void;
  value: string;
};

export default function ImageGeneration() {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom);

  const ImageGeneratorContainer = styled("div", {});

  const TextInput = ({ value, onChange }: Props) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };
  
    return <input type="text" value={value} onChange={handleInputChange} />;
  };
  const Main = tw.main`flex flex-col justify-between items-center p-24 min-h-screen`;
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios.post<ImageResponse>(
      "https://api.openai.com/v1/images/generations",
      {
        model: "image-alpha-001",
        prompt: description,
        num_images: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    setImageUrl(response.data.data[0].url);
  };


  return (
    <>
      <Head>
        <title>Generate image</title>
        <meta name="description" content="Generate image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu isUserLogged={false} />
      <div>
        <h1>Generate image</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Description:
          <input type="text" value={description} onChange={handleChange} />

          </label>
          <button type="submit">Generate Image</button>
        </form>
        {imageUrl && <Image width="400" height="400" src={imageUrl} alt="Generated Image" />}
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      apiKey: process.env.OPENAI_API_KEY ?? "",
    },
  };
}
