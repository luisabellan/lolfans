import { useSession, signIn, signOut } from "next-auth/react";
import tw, { styled } from 'twin.macro';
import css from "@emotion/css";
import { atom, useAtom } from "jotai";
import { isUserLoggedAtom } from "@/atoms/store";
import useHistory from "next/router";
import router from "next/router";
import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from "next/image";
import PropTypes from 'prop-types';
import AuthModal from './AuthModal';
import { Menu, Transition } from '@headlessui/react';
import {
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  SparklesIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
// import { fetchPlayList } from "../lib/youtube";



const Item = tw.li`list-none pr-6`;
const Links = tw.ul`flex flex-row justify-end items-center`;
const ImageContainer = tw.div`w-9/12`;
const Container = tw.div`flex flex-row justify-between items-center  h-16`;
const Button = tw.button`bg-blue-500 py-2 hover:bg-blue-700 text-white font-bold px-4 rounded`;

const noUnderline = {
  textDecoration: 'none',
};



export default function HeaderMenu({
  isUserLogged,
}: {
  isUserLogged: boolean;
}) {

  const { data, status } = useSession();
  const loading = status === "loading";
  const isLoadingUser = status === 'loading';
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom)
  const user = data?.user

  user?.email ? setLoggedIn(true) : setLoggedIn(false)

  const router = useRouter();

  const [showModal, setShowModal] = useState(false);


  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Your YouTube channel ID here
  const channelId = "UC-lHJZR3Gqxm24_Vd_AJ5Yw";

  const getVideos = async () => {

    // Call the getPlaylistItems function to fetch the list of videos
    // const videos = await fetchPlayList(channelId);
  }

  const handleLogIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signIn("google");

  };

  const handleLogOut = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signOut()


  };

  return (
    <Container>
      <ImageContainer>
        <Image
          src='/logos/logo.png'
          alt='LoLFans Logo'
          className=''
          width={50}
          height={50}
          priority
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </ImageContainer>
      <Links>
        <Item>
          <Link href='/'>
            Home
          </Link>
        </Item>
        <Item>
          <Link href='/players'>
            Players
          </Link>
        </Item>
        <Item>
          <Link href='/champions'>
            Champions
          </Link>
        </Item>
        <Item>{loggedIn &&
          (<Link href='/profile'>
            Profile
          </Link>)}
        </Item>

        <Item>
          <Link href='/'>
            {!loggedIn ? (<Button onClick={handleLogIn}>Login</Button>) : (<Button onClick={handleLogOut}>Logout</Button>)}
          </Link>
        </Item>
        
      </Links>
    </Container >
  );
}


