import Link from "next/link";
import Image from "next/image";
import tw, { css, styled, theme } from 'twin.macro'
import { useState } from "react";
import { atom, useAtom } from "jotai";
import { isUserLoggedAtom } from "@/atoms/store";
import useHistory from "next/router";
import router from "next/router";
import { signIn, signOut, useSession } from "next-auth/react"


const Item = tw.li`list-none pr-6`;
const Links = tw.ul`flex flex-row justify-end items-center`;
const ImageContainer = tw.div`w-9/12`;
const Container = tw.div`flex flex-row justify-between items-center  h-16`;
const Button = tw.button`bg-blue-500 py-2 hover:bg-blue-700 text-white font-bold px-4 rounded`;
const StyledLink = styled(Link)`
  ${tw`text-white font-bold no-underline`}
`;

const loggedInAtom = atom(false);
export default function HeaderMenu() {
  // const [loggedIn,noUnderline setLoggedIn] = useAtom(isUserLoggedAtom);
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const handleLogIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // setLoggedIn(!loggedIn);
    signIn()

    if (!session) {
      router.push("/");
    }
  };

  const handleLogOut = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // setLoggedIn(!loggedIn);
    signOut()

    if (!session) {
      router.push("/");
    }
  };

  return (
    <Container>
      <ImageContainer>
        <Image
          src="/logos/logo.png"
          alt="LoLFans Logo"
          className=""
          width={50}
          height={50}
          priority
        />
      </ImageContainer>
      <Links>
        <Item>
          <StyledLink href="/">
            Home
          </StyledLink>
        </Item>
        <Item>
          <StyledLink href="/players">
            Players
          </StyledLink>
        </Item>
        <Item>
          <StyledLink href="/champions">
            Champions
          </StyledLink>
        </Item>
        {session ? (
          <Item>
            <StyledLink href="/profile">
              Profile
            </StyledLink>
          </Item>
        ) : null}

        <Item>
          <StyledLink href="/me">
            {session?.user?.name === "admin" ? "Admin Panel" : "My Profile"}
          </StyledLink>
        </Item>

        {!session?.user ? (
          <Item>
            {/* show link to profile if isUserLogged is true*/}
            <Link href="/login">
              <Button onClick={handleLogIn}>Login</Button>
            </Link>
          </Item>
        ) : (
          <Item>
            <Link href="/logout">
              <Button onClick={handleLogOut}>Logout</Button>
            </Link>
          </Item>
        )}
      </Links>
    </Container>
  );
}
