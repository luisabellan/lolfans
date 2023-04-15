import React, { ChangeEvent, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { useAtom } from "jotai";
import { isUserLoggedAtom, userNameAtom } from "@/atoms/store";
import Welcome from "@/components/Welcome";
import tw, { styled } from "twin.macro";
import Head from "next/head";
import HeaderMenu from "@/components/HeaderMenu";
import axios from "axios";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface ImageResponse {
  data: {
    url: string;
  }[];
}

interface ProfileProps {
  avatarUrl: string;
  username: string;
  summonerName: string;
  isUserLogged: boolean;
}

type Props = {
  onChange: (value: string) => void;
  value: string;
};

const Content = styled.div`
  ${tw`
    flex
    flex-col
    items-center
    justify-center
    bg-white
    rounded-md
    shadow-md
    p-6
    mt-12
  `}
`;

const Image = styled.img`
  width: 12rem;
  height: 12rem;
`;


const Form = tw.form`
  flex
  flex-col
  items-center
  justify-center


`

const Main = tw.main`flex flex-col justify-between items-center p-24 min-h-screen`;


const ProfilePage: React.FC<ProfileProps> = () => {
  const [bio, setBio] = useState("");
  const [avatarUrl, setImageUrl] = useState<string | null>(null);
  const [text, setText] = useState("");

  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom);
  const [userName, setUserName] = useAtom(userNameAtom);
  
  const TextInput = ({ value, onChange }: Props) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return <input type="text" value={value} onChange={handleInputChange} />;
  };

  const handleBioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setBio(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios.post<ImageResponse>(
      "https://api.openai.com/v1/images/generations",
      {
        model: "image-alpha-001",
        prompt: bio,
        num_images: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
      }
    );
    setImageUrl(response.data.data[0].url);
  };

  return (
    <>
      <Head>
        <title>Search champion</title>
        <meta name="description" content="Champion search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu isUserLogged={true} />
      <Content>
        <h1>Profile</h1>

        {avatarUrl && <Image src={avatarUrl} alt="Avatar" />}
        <Form onSubmit={handleSubmit}>
          {userName ? (
            <span>Username: {userName}</span>
          ) : (
            <TextInput value={text} onChange={setText} />
          )}
          <textarea
            placeholder="Write a bio here"
            value={bio}
            onChange={handleBioChange}
          ></textarea>
          <button type="submit">Generate Image</button>
        </Form>
      </Content>
    </>
  );
};

export default ProfilePage;

export async function getStaticProps() {
  return {
    props: {
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? "",
    },
  };
}
