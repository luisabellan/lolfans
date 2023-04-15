import { AppProps } from "next/app";
import GlobalStyles from "@/styles/GlobalStyles";

import React, { useState, createContext} from "react";

type UserContextType = {
  // define your required properties and their types here
  user?: {};
  setUser?: (user: any) => void;
  isUserLogged?: boolean;
  setIsUserLogged?: (isUserLogged: boolean) => void;
  children: React.ReactNode;
};

let defaultValues: UserContextType = {
  // initialize your context's default values here
  children: undefined,
  user: {},
  setUser: () => {},
  isUserLogged: false,
  setIsUserLogged: () => {},

};

const UserContext = createContext<UserContextType>(defaultValues); // optional defaultValue

  const UserProvider: React.FC<UserContextType> = ({ children, user: userProp, setUser: setUserProp, isUserLogged: isUserLoggedProp, setIsUserLogged: setIsUserLoggedProp }) => {
  const [user, setUser] = useState({});
  const [isUserLogged, setIsUserLogged] = useState(false);
  

const App = ({ Component, pageProps }: AppProps) => {
  const userState = {
    user: userProp || user,
    setUser: setUserProp || setUser,
    isUserLogged: isUserLoggedProp || isUserLogged,
    setIsUserLogged: setIsUserLoggedProp || setIsUserLogged,
    children,
  };

  <GlobalStyles />;
  return (
    <UserContext.Provider value={userState}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
};

export default App;
