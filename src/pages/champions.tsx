import Head from "next/head";
import Link from "next/link";
import tw from "twin.macro";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import HeaderMenu from "@/components/HeaderMenu";

const Main = tw.main`flex flex-col justify-between items-center`;
const Header = tw.h1`text-3xl font-bold`;
const FormContainer = tw.div`max-w-md`;
const TextInput = tw(Field)`px-4 py-2 border rounded w-full my-2`;
const Button = tw.button`bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`;

interface Champ {
  id: string;
  name: string;
  title: string;
}

export default function Champions() {
  const getChampByName = async (name: string) => {
    const formattedName = _.startCase(_.toLower(name));
    const champData = `http://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion/${formattedName}.json`;

    try {
      const res = await axios.get(champData);
      return res.data.data[formattedName];
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return (
    <>
      <Head>
        <title>Search champion</title>
        <meta name="description" content="Champion search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu isUserLogged={false} />
      <Main>
        <Header>Search champion</Header>
        <Formik
          initialValues={{ searchText: "" }}
          validationSchema={Yup.object({
            searchText: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            const champ = await getChampByName(values.searchText);

            if (champ) {
              setFieldValue("searchText", "");
              alert(`Champion ${champ.name} found!`);
            } else {
              setFieldError("searchText", "Champion not found");
            }

            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <FormContainer>
              <Form>
                
                <TextInput type="text" name="searchText"  />
                <ErrorMessage name="searchText">{(msg) => <div tw="text-red-500 text-sm">{msg}</div>}</ErrorMessage>
                <Button type="submit" disabled={isSubmitting}>
                Search
              </Button>
              </Form>
            </FormContainer>
          )}
        </Formik>
      </Main>
    </>
  );
}
function setFieldValue(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}

