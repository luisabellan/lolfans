import React from "react";
import tw, { styled } from "twin.macro";
import { useSession, signIn, signOut } from "next-auth/react"

interface HeaderProps {
  isUserLogged: boolean;
  username: string;
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
  username,
}: HeaderProps): JSX.Element => {
  


// 384F-AE00
  return (
    <Container>

      
      <h1>Welcome to My Game App</h1>
      {isUserLogged ? (
        <p>Hello, {username}!</p>
      ) : (
        <p>Please login to see your profile</p>
      )}

    </Container>
  );
};

/* const Welcome: React.FC<HeaderProps> = ({
  isUserLogged,
  username,
}: HeaderProps): JSX.Element => {
  
  const { data: session } = useSession()


  return (
    <Container>

      
      <h1>Welcome to My Game App</h1>
      {isUserLogged ? (
        <p>Hello, {username}!</p>
      ) : (
        <p>Please login to see your profile</p>
      )}

    </Container>
  );
}; */

/* const Welcome: React.FC<HeaderProps> = ({
  isUserLogged,
  username,
}: HeaderProps): JSX.Element => {

  const { data: session } = useSession()
  
  if(session) {
    return <>
      Signed in as {session.user?.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }
  return <>
  Not signed in <br/>
  <button onClick={() => signIn()}>Sign in</button>
  </>
} */


export default Welcome;
