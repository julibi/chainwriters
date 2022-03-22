import { AppProps } from 'next/app';
import Head from 'next/head';
import { Web3ReactProvider } from '@web3-react/core';
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BG_NORMAL, PLAIN_WHITE } from "../themes";

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
  }
`;

import './styles.css';
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
        <title>MOONLIT</title>
      </Head>
      <main className="app">
        <GlobalStyle />
        <Web3ReactProvider getLibrary={getLibrary}>
          <Component {...pageProps} />
        </Web3ReactProvider>
      </main>
    </>
  );
}

export default CustomApp;
