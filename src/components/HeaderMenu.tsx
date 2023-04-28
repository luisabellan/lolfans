import { useSession, signIn, signOut } from "next-auth/react";
import tw, { styled } from 'twin.macro';
import { atom, useAtom } from "jotai";
import { isUserLoggedAtom } from "@/atoms/store";
import useHistory from "next/router";
import router from "next/router";
import { Fragment, MouseEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
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
import { fetchPlayList as getPlaylistItems } from "@/lib/youtube";
// import { getPlaylistItems } from "@/lib/youtube.js";


const Item = tw.li`list-none pr-6`;
const Links = tw.ul`flex flex-row justify-end items-center`;
const ImageContainer = tw.div`w-9/12`;
const Container = tw.div`flex flex-row justify-between items-center  h-16`;
const Button = tw.button`bg-blue-500 py-2 hover:bg-blue-700 text-white font-bold px-4 rounded`;

const menuItems = [
  {
    label: 'Add a new game',
    icon: PlusIcon,
    href: '/list',
  },
  {
    label: 'My games',
    icon: HomeIcon,
    href: '/games',
  },
  {
    label: 'Favorites',
    icon: HeartIcon,
    href: '/favorites',
  },
  {
    label: 'Logout',
    icon: LogoutIcon,
    onClick: signOut,
  },
];

export default function HeaderMenu({
  isUserLogged,
}: {
  isUserLogged: boolean;
}) {
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom)

  const { data, status } = useSession();
  const loading = status === "loading";
  const user = data?.user;
  const isLoadingUser = status === 'loading';

  const router = useRouter();



  // Your YouTube channel ID here
  const channelId: string = "UC-lHJZR3Gqxm24_Vd_AJ5Yw";

  const getVideos = async (channelId: string) => {

    // Call the getPlaylistItems function to fetch the list of videos
    const videos = await getPlaylistItems(channelId);
    return videos
  }


  const handleLogIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoggedIn(!loggedIn);
    if (!loggedIn) {
      // signIn("google");
      router.push("/");
    }
  };

  const signOut: MouseEventHandler<HTMLButtonElement> = async (e) => {
    // Call the sign-out function here
    signOut(e);
  };
  const handleLogOut = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoggedIn(!loggedIn);

    if (!loggedIn) {
      // signOut();
      router.push("/");
    }
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
        />
      </ImageContainer>
      <Links>
        <Item>
          <Link href='/'>
            <span tw="no-underline">Home</span>
          </Link>
        </Item>
        <Item>
          <Link tw="no-underline" href='/players'>
            Players
          </Link>
        </Item>
        <Item>
          <Link tw="no-underline" href='/champions'>
            Champions
          </Link>
        </Item>
        {/* {isLoadingUser  ? ( */}
        {(isLoadingUser || loggedIn) ? (
          <div className="h-8 w-[75px] bg-gray-200 animate-pulse rounded-md" />
          // ) : user ? (
        ) : loggedIn ? (
          <Menu as="div" className="relative z-50">
            <Menu.Button className="flex items-center space-x-px group">
              <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                {user?.image ? (
                  <Image
                    src={user?.image}
                    alt={user?.name || 'Avatar'}
                    layout="fill"
                  />
                ) : (
                  <UserIcon className="text-gray-400 w-6 h-6" />
                )}
              </div>
              <ChevronDownIcon className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-current" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-72 overflow-hidden mt-1 divide-y divide-gray-100 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="flex items-center space-x-2 py-4 px-4 mb-2">
                  <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                    {user?.image ? (
                      <Image
                        src={user?.image}
                        alt={user?.name || 'Avatar'}
                        layout="fill"
                      />
                    ) : (
                      <UserIcon className="text-gray-400 w-6 h-6" />
                    )}
                  </div>
                  <div className="flex flex-col truncate">
                    <span>{user?.name}</span>
                    <span className="text-sm text-gray-500">
                      {user?.email}
                    </span>
                  </div>
                </div>

                <div className="py-2">
                  {menuItems.map(
                    ({ label, href, onClick, icon: Icon }) => (
                      <div
                        key={label}
                        className="px-2 last:border-t last:pt-2 last:mt-2"
                      >
                        <Menu.Item>
                          {href ? (
                            <Link href={href}>
                              <a className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100">
                                <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                                <span>{label}</span>
                              </a>
                            </Link>
                          ) : (
                            <>
                              <button
                                className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                                onClick={signOut}
                              >
                                <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                              </button>
                            </>
                          )}
                        </Menu.Item>
                      </div>
                    )
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <>
            <Item>
              {/* show link to profile if isUserLogged is true*/}
              <Link tw="no-underline" href='/login'>
                <Button onClick={handleLogIn}>Login</Button>
              </Link>
            </Item>
          </>
        )}
      </Links>
    </Container>
  );
}
