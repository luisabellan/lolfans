import React, { useState } from 'react';
import Welcome from '@/components/Welcome';
import tw, { styled } from 'twin.macro';
import Head from 'next/head';
import HeaderMenu from '@/components/HeaderMenu';

interface ProfileProps {
  avatarUrl: string;
  username: string;
  summonerName: string;
  isUserLogged: boolean;
}

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

const ProfilePage: React.FC<ProfileProps> = ({ avatarUrl, username, summonerName, isUserLogged }: ProfileProps) => {
  const [bio, setBio] = useState('');

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Search champion</title>
        <meta name="description" content="Champion search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu isUserLogged={true}/>
      <Content>
        <h1>Profile</h1>
        <img src={avatarUrl} alt="Avatar" />
        <p>Username: {username}</p>
        <p>Summoner Name: {summonerName}</p>
        <textarea placeholder="Write a bio here" value={bio} onChange={handleBioChange}></textarea>
        
      </Content>
    </>
  );
};

export default ProfilePage;
