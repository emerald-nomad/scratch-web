import "../styles/globals.scss";
import Head from "next/head";
import type { AppProps } from "next/app";
import { useApollo } from "lib";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Scratch</title>
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
