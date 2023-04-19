import React from "react";
import tw, { styled } from "twin.macro";
import { useSession, signIn, signOut } from "next-auth/react";

interface HeaderProps {
  isUserLogged: boolean;
  userName: string;
}

const Container = styled.div`
  ${tw`
    flex
    flex-col
    items-center
    justify-between
    bg-white
    p-4
  `}
`;

const Welcome: React.FC<HeaderProps> = ({
  isUserLogged,
  userName,
}: HeaderProps): JSX.Element => {
  return (
    <Container>
      <h1>Welcome to My Game App</h1>
      {isUserLogged ? (
        <p>Hello, {userName}!</p>
      ) : (
        <p>Please login to see your profile</p>
      )}
    </Container>
  );
};

export default Welcome;
