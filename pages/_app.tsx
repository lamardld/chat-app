import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { auth, db, rdb } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../components/Login";
import { SpinnerDotted } from "spinners-react";
import App from "../components/App";
import { useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import theme from "../theme";
import Head from "next/head";
// import { useRouter } from "next/router";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [user, loading] = useAuthState(auth);

  // user?.getIdTokenResult().then((t) => console.log(t.claims.admin));

  // console.log(auth.currentUser);

  useEffect(() => {
    TimeAgo.addDefaultLocale(en);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0'
        />
      </Head>

      <ChakraProvider theme={theme}>
        {!user ? (
          <Login />
        ) : (
          <App router={router} Component={Component} pageProps={pageProps} />
        )}
      </ChakraProvider>
    </>
  );
}

export default MyApp;

export const Loading = () => {
  return (
    <Flex
      position='fixed'
      top={0}
      right={0}
      left={0}
      bottom={0}
      h='100vh'
      w='100vw'
      align='center'
      justify='center'>
      <SpinnerDotted color='#007affff' />
    </Flex>
  );
};
