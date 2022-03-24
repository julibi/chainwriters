import { AppProps } from 'next/app'
import Head from 'next/head'
import { Web3ReactProvider } from '@web3-react/core'
import { createGlobalStyle} from "styled-components"
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers'
import Layout from '../components/Layout'
import { BG_NORMAL, PLAIN_WHITE } from "../themes"
import './styles.css'
import ToastContainer from '../components/ToastContainer'

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
      <GlobalStyle />
      <Web3ReactProvider getLibrary={getLibrary}>
        <main className="app">
         <ToastContainer />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </Web3ReactProvider>
    </>
  );
}

export default CustomApp;
