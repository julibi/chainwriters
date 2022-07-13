import { AppProps } from 'next/app';
import Head from 'next/head';
import { Web3ReactProvider } from '@web3-react/core';
import { createGlobalStyle } from 'styled-components';
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers';
import Layout from '../components/Layout';
import { BG_NORMAL, PLAIN_WHITE } from '../themes';
import './styles.css';
import ToastContainer from '../components/ToastContainer';
import client from '../apolloclient';
import { ApolloProvider } from '@apollo/client';

const GlobalStyle = createGlobalStyle`
html{
  box-sizing: border-box;
  display:block;
  height: 100%;
  margin:0 auto;
  padding: 0;
}

  body{
    background-color: ${BG_NORMAL};
    color: ${PLAIN_WHITE};
    font-family: 'Nunito Sans';
  
    @font-face {
      font-family: "Roboto Mono";
      src: url("/fonts/RobotoMono/RobotoMono-Regular.ttf");
      font-style: variable;
      font-display: swap;
    }

    @font-face {
      font-family: "Roboto Mono Bold";
      src: url("/fonts/RobotoMono/RobotoMono-Bold.ttf");
      font-style: variable;
      font-display: swap;
    }

    @font-face {
      font-family: "Nunito Sans";
      src: url("/fonts/NunitoSans/NunitoSans-Regular.ttf");
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Nunito Sans Bold";
      src: url("/fonts/NunitoSans/NunitoSans-Bold.ttf");
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Nunito Sans Black";
      src: url("/fonts/NunitoSans/NunitoSans-Black.ttf");
      font-style: normal;
      font-display: swap;
    }
  }
`;

function getLibrary(
  provider: ExternalProvider | JsonRpcFetchFunc
): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Moonpage</title>

        <meta charSet="utf-8" />
        <meta property="og:locale" content="en_US" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#1B1E28" />
        <meta property="og:site_name" content="Moonpage" />
        <meta property="og:title" content="Literature NFTs" />
        <meta
          property="og:description"
          content="Start a literature movement on the blockchain. Create and collect NFTs."
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://www.moonpage.io/website.png"
        />
        <meta property="og:url" content="http://www.moonpage.io" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <Web3ReactProvider getLibrary={getLibrary}>
        <ApolloProvider client={client}>
          <main className="app">
            <ToastContainer />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </main>
        </ApolloProvider>
      </Web3ReactProvider>
    </>
  );
}

export default CustomApp;
