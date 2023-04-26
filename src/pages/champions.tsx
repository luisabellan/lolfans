import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";

import Head from "next/head";
import Link from "next/link";
import tw, { styled } from "twin.macro";

import HeaderMenu from "@/components/HeaderMenu";

const Header = tw.h1`text-3xl font-bold`;
const Main = tw.main`flex flex-col justify-between items-center`;
const CustomForm = tw.form`flex flex-col`;
const Button = tw.button`bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`;
const TextInput = tw(Field)`px-4 py-2 border rounded w-full my-2`;

const ErrorText = styled.span`
  color: red;
`;

interface Champ {
  id: string;
  name: string;
  title: string;
  stats: {};
  tags: [];
  image: {
    full: string;
  };
  blurb: string;
  lore: string;
}

export default function Champions() {
  const initialValues = { searchText: "" };

  const validationSchema = yup.object().shape({
    searchText: yup.string().required("Search text is required"),
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (values: { searchText: string }, actions: any) => {
    try {
      const formattedName = formatName(values.searchText);
      const champData = `http://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion/${formattedName}.json`;

      const res = await axios.get(champData);
      setChamp(res.data.data[formattedName]);

      actions.resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const formatName = (name: string): string => {
    const [firstName, lastName] = name.split(" ");

    if (lastName) {
      const output = capitalize(firstName) + capitalize(lastName);
      return output;
    }

    return capitalize(name);
  };

  const capitalize = (word: string): string =>
    `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;

  const [champ, setChamp] = React.useState<Champ | null>(null);

  return (
    <>
      <Head>
        <title>Search champion</title>
        <meta name="description" content="Champion search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu isUserLogged={loggedIn} />
      <Main>
        <Header>Search champion</Header>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({ isSubmitting }) => (
            <CustomForm>
              <Field type="text" id="searchText" name="searchText" as={TextInput}/>

              <ErrorMessage name="searchText" component={ErrorText} />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Searching..." : "Search"}
              </Button>
            </CustomForm>
          )}
        </Formik>
        {champ ?  (
          <ul>
            <li>Id: {champ.id}</li>
            <li>Name: {champ.name}</li>
            <li>Title: {champ.title}</li>
          </ul>
        ) : null}
      </Main>
    </>
  );
}
