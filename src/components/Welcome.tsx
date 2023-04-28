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
      <h1 tw="mt-16">Welcome to My Game App</h1>
      {/* {isUserLogged ? (
        <p tw="mt-2">Hello, {userName}!</p>
      ) : (
        <p tw="mt-2">Please login to see your profile</p>
      )} */}

      <main className="flex-grow container mx-auto">
        <div className="px-4 py-12">
          {typeof children === 'function' ? children(openModal) : children}
        </div>
      </main>

      <AuthModal show={showModal} onClose={closeModal} />
    </Container>
  );
};

export default Welcome;
