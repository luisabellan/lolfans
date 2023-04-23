import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import tw, { css, styled } from 'twin.macro';
import router from "next/router";

const Item = tw.li`list-none pr-6`;
const Links = tw.ul`flex flex-row justify-end items-center`;
const ImageContainer = tw.div`w-9/12`;
const Container = tw.div`flex flex-row justify-between items-center  h-16`;
const Button = tw.button`bg-blue-500 py-2 hover:bg-blue-700 text-white font-bold px-4 rounded`;

const noUnderline = {
  textDecoration: "none",
};

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role?: string | null | undefined;
}

export default function HeaderMenu() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const handleLogIn = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    signIn("credentials").then(() => {
      // onSuccess callback
      if (session) {
        router.push("/"); // redirect after successful login
      }
    });
  };

  const handleLogOut = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    signOut().then(() => {
      // onSuccess callback
      if (!session) {
        router.push("/"); // redirect after successful logout
      }
    });
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
          <Link href="/">
            Home
          </Link>
        </Item>
        <Item>
          <Link href="/players">
            Players
          </Link>
        </Item>
        <Item>
          <Link href="/champions">
            Champions
          </Link>
        </Item>
        {session?.user ? (
          <Item>
            <Link href="/profile">
              Profile
            </Link>
          </Item>
        ) : null}

          <Item>
            <Link href="/api-example">
              API
            </Link>
          </Item>
          {session && session.user && session.user?.role === "admin" ? (
          <Item>
            <Link href="/me">
              Admin
            </Link>
          </Item>
        ) : null}

        {!session?.user ? (
          <Item>
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
