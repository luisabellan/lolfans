import React, { createContext, useContext, useState } from 'react';

interface MyComponentProps {
  user?: {};
  setUser?: (user: any) => void;
  children: React.ReactNode;
}

const defaultValues: MyComponentProps = {
    user: {},
    setUser: () => { },
    children: undefined
};

const UserContext = createContext<MyComponentProps>(defaultValues);

const UserProvider: React.FC<MyComponentProps> = ({ children, user: userProp, setUser: setUserProp }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider
    value={{
        user: userProp || user,
        setUser: setUserProp || setUser,
        children
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
