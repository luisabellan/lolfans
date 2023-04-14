import { AppProps } from 'next/app'
import GlobalStyles from '@/styles/GlobalStyles'


import React from 'react';


type MyContextType = {
  // define your required properties and their types here
};

let defaultValue: MyContextType = {
  // initialize your context's default values here
};

const MyContext = React.createContext<MyContextType>(defaultValue={}); // optional defaultValue

const App = ({ Component, pageProps }: AppProps) => {

  const user = { name: 'Edu', darkMode: true };

  <GlobalStyles />
  return (

    <MyContext.Provider value={user}>
      <Component {...pageProps} />
    </MyContext.Provider>
  )
}

export default App
