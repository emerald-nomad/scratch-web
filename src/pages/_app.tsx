import "../styles/globals.scss";
import Head from "next/head";
import type { AppProps } from "next/app";
import { useApollo } from "lib";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";
import { Layout } from "components";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const apolloClient = useApollo(pageProps);

  const noLayoutRoutes = ["/", "/login", "/signup"];

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Scratch</title>
      </Head>
      {noLayoutRoutes.includes(pathname) ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />{" "}
        </Layout>
      )}
    </ApolloProvider>
  );
}
export default MyApp;
