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
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// const inter = Inter({ subsets: ['latin'] })

const headStyle = "text-3xl, font-bold";

export default function ImageGenerator() {
  const [image, setImage] = useState(null);
  const [promptInput, setPromptInput] = useState("pangolin");
  
  const Input = styled("input", {
    color: "red",
    margin: "2rem",
  });
  
  const ImageGeneratorContainer = styled("div", {});
  
  const Main = styled("main", {
    display: "flex",
    "flex-direction": "column",
    "justify-content": "space-between",
    "align-items": "center",
    padding: "6rem",
    "min-height": "100vh",
  });
  
  async function generateImage(myPrompt) {
    try {
      const response = await openai.createImage({
        prompt: myPrompt,
        n: 1,
        size: "1024x1024",
      });
      console.log(JSON.stringify(response));
      const imageData = JSON.stringify(response);
      console.log(imageData)
      // setImage(imageData)
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }

  useEffect(() => {
  }, []);


  return (
    <>
      <Head>
        <title>Generate image</title>
        <meta name="description" content="Generate image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu />
      <Main>
        <span>Generate image</span>
        <form onSubmit={() => generateImage(promptInput)}>
          <label htmlFor="prompt">Prompt:</label>
          <input type="text" defaultValue={promptInput} name="prompt" />
          <button
            type="submit"
            tw="bg-blue-600 p-2"
            onClick={() => generateImage(promptInput)}
          >
            Generate image
          </button>
          <img src={`${image}`} alt={`${promptInput}`} />
        </form>
      </Main>
    </>
  );
}

export async function getStaticProps() {
  // Connect to Database using DB properties
  return {
    props: {
      apiKey: process.env.OPENAI_API_KEY,
    },
  }
}