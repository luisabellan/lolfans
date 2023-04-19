import Link from 'next/link';
import Image from 'next/image';
import tw, { styled } from 'twin.macro';
import { useState } from 'react';
import { atom, useAtom } from 'jotai';
import { isUserLoggedAtom } from '@/atoms/store';
import useHistory from 'next/router';
import router from 'next/router';

const Item = tw.li`list-none pr-6`;
const Links = tw.ul`flex flex-row justify-end items-center`;
const ImageContainer = tw.div`w-9/12`;
const Container = tw.div`flex flex-row justify-between items-center  h-16`;
const Button = tw.button`bg-blue-500 py-2 hover:bg-blue-700 text-white font-bold px-4 rounded`;

const noUnderline = {
  textDecoration: 'none',
};

const loggedInAtom = atom(false);
export default function HeaderMenu({
  isUserLogged,
}: {
  isUserLogged: boolean;
}) {
  const [loggedIn, setLoggedIn] = useAtom(isUserLoggedAtom);

  const handleLoginClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoggedIn(!loggedIn);

    if (!loggedIn) {
      router.push('/');
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
          <Link css={noUnderline} href='/'>
            Home
          </Link>
        </Item>
        <Item>
          <Link css={noUnderline} href='/players'>
            Players
          </Link>
        </Item>
        <Item>
          <Link css={noUnderline} href='/champions'>
            Champions
          </Link>
        </Item>
        {loggedIn ? (
          <>
            <Item>
              <Link css={noUnderline} href='/profile'>
                Profile
              </Link>
            </Item>
            <Item>
              <Link css={noUnderline} href='/logout'>
                <Button onClick={handleLoginClick}>Logout</Button>
              </Link>
            </Item>
          </>
        ) : (
          <>
            <Item>
              {/* show link to profile if isUserLogged is true*/}
              <Link css={noUnderline} href='/login'>
                <Button onClick={handleLoginClick}>Login</Button>
              </Link>
            </Item>
          </>
        )}
      </Links>
    </Container>
  );
}
