import React, { createContext, useState } from 'react';

interface MyComponentProps {
  user?: {};
  setUser?: (user: any) => void;
  isUserLogged?: boolean;
  setIsUserLogged?: (isUserLogged: boolean) => void;
  children: React.ReactNode;
}

const defaultValues: MyComponentProps = {
    user: {},
    setUser: () => { },
    isUserLogged: false,
    children: undefined
};

const UserContext = createContext<MyComponentProps>(defaultValues);

const UserProvider: React.FC<MyComponentProps> = ({ children, user: userProp, setUser: setUserProp, isUserLogged: isUserLoggedProp, setIsUserLogged: setIsUserLoggedProp }) => {
  const [user, setUser] = useState({});
  const [isUserLogged, setIsUserLogged] = useState(false);
  

  return (
    <UserContext.Provider
    value={{
        user: userProp || user,
        setUser: setUserProp || setUser,
        isUserLogged: isUserLoggedProp || isUserLogged,
        setIsUserLogged: setIsUserLoggedProp || setIsUserLogged,
        children
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
