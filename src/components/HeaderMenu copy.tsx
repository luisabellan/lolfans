import { Fragment, useState } from 'react';

import Link from "next/link";
import Image from "next/image";
import tw, { styled } from "twin.macro";
import { atom, useAtom } from "jotai";
import { isUserLoggedAtom } from "@/atoms/store";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
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



const Item = tw.li`list-none pr-6`;
const Links = tw.ul`flex flex-row justify-end items-center`;
const ImageContainer = tw.div`w-9/12`;
const Container = tw.div`flex flex-row justify-between items-center  h-16`;
const Button = tw.button`bg-blue-500 py-2 hover:bg-blue-700 text-white font-bold px-4 rounded`;

const menuItems = [
  {
    label: 'List a new home',
    icon: PlusIcon,
    href: '/create',
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


const noUnderline = {
  textDecoration: "none",
};

const loggedInAtom = atom(false);
export default function HeaderMenu({
  isUserLogged,
  openModal,
  closeModal
}: {
  isUserLogged: boolean;
  openModal: any,
  closeModal: any,
}): JSX.Element {
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom);
  const router = useRouter();


  const isLoadingUser = status === 'loading';


  const handleLoginClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!loggedIn) {
      openModal()

    }
    setLoggedIn(!loggedIn);
    router.push("/");

    
  };

  return (
    <Container>
      <ImageContainer>
        <Image
          src="/logos/logo.png"
          alt="LoLFans Logo"
          tw=""
          width={50}
          height={50}
          priority
        />
      </ImageContainer>
      <Links>
        <Item>
          <Link css={noUnderline} href="/">
            Home
          </Link>
        </Item>
        <Item>
          <Link css={noUnderline} href="/players">
            Players
          </Link>
        </Item>
        <Item>
          <Link css={noUnderline} href="/champions">
            Champions
          </Link>
        </Item>
        {loggedIn ? (
          <Item>
            <Link css={noUnderline} href="/profile">
              Profile
            </Link>
          </Item>
        ) : null}
        {(isLoadingUser && user) ? (
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
                                    <button
                                      className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                                      onClick={onClick}
                                    >
                                      <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                                      <span>{label}</span>
                                    </button>
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
                  
                  <Button
                    type="button"
                    onClick={handleLoginClick}
                    className="ml-4 px-4 py-1 rounded-md bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-500 focus:ring-opacity-50 text-white transition"
                  >
                    Log in
                  </Button>
                )}


       {/*  {(!loggedIn || !isLoadingUser) ? (
                  <div tw="h-8 w-[75px] bg-gray-200 animate-pulse rounded-md" />
                ) : user ? (
                  <Menu as="div" tw="relative z-50">
                    <Menu.Button tw="flex items-center space-x-px group">
                      <div tw="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                        {user?.image ? (
                          <Image
                            src={user?.image}
                            alt={user?.name || 'Avatar'}
                            layout="fill"
                          />
                        ) : (
                          <UserIcon tw="text-gray-400 w-6 h-6" />
                        )}
                      </div>
                      <ChevronDownIcon tw="w-5 h-5 shrink-0 text-gray-500 group-hover:text-current" />
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
                      <Menu.Items tw="absolute right-0 w-72 overflow-hidden mt-1 divide-y divide-gray-100 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div tw="flex items-center space-x-2 py-4 px-4 mb-2">
                          <div tw="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                            {user?.image ? (
                              <Image
                                src={user?.image}
                                alt={user?.name || 'Avatar'}
                                layout="fill"
                              />
                            ) : (
                              <UserIcon tw="text-gray-400 w-6 h-6" />
                            )}
                          </div>
                          <div tw="flex flex-col truncate">
                            <span>{user?.name}</span>
                            <span tw="text-sm text-gray-500">
                              {user?.email}
                            </span>
                          </div>
                        </div>

                        <div tw="py-2">
                          {menuItems.map(
                            ({ label, href, onClick: onClick, icon: Icon }): JSX.Element => (
                              <div
                                key={label}
                                tw="px-2 last:border-t last:pt-2 last:mt-2"
                              >
                                <Menu.Item>
                                  {href ? (
                                    <Link href={href}>
                                      <a tw="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100">
                                        <Icon tw="w-5 h-5 shrink-0 text-gray-500" />
                                        <span>{label}</span>
                                      </a>
                                    </Link>
                                  ) : (
                                    <button
                                      tw="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                                      onClick={onClick}
                                    >
                                      <Icon tw="w-5 h-5 shrink-0 text-gray-500" />
                                      <span>{label}</span>
                                    </button>
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
          <Item>
            <Link css={noUnderline} href="/login">
              <Button onClick={handleLoginClick}>Login</Button>
            </Link>
          </Item>
        )} */}
      </Links>
    </Container>
  );
}
