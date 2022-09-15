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
import { AuctionsProvider, CollectionProvider, FactoryProvider, ManagerProvider, ProjectsProvider, UserProvider } from '../providers';

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
    font-family: 'Inter';

    @font-face {
      font-family: "Inter Light";
      src: url("/fonts/Inter/Inter-ExtraLight.ttf");
      font-style: variable;
      font-display: swap;
    }

    @font-face {
      font-family: "Inter";
      src: url("/fonts/Inter/Inter-Regular.ttf");
      font-style: variable;
      font-display: swap;
    }

    @font-face {
      font-family: "Inter Bold";
      src: url("/fonts/Inter/Inter-Bold.ttf");
      font-style: variable;
      font-display: swap;
    }

    @font-face {
      font-family: "Inter Black";
      src: url("/fonts/Inter/Inter-Black.ttf");
      font-style: variable;
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
        <meta property="og:title" content="Text NFTs" />
        <meta
          property="og:description"
          content="Create and collect text NFTs. Start a literature movement on the blockchain. "
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://www.moonpage.io/website.png"
        />
        <meta property="og:url" content="http://www.moonpage.io" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <GlobalStyle />
      <Web3ReactProvider getLibrary={getLibrary}>
        <ApolloProvider client={client}>
          <ToastContainer />
          <ProjectsProvider>
            <UserProvider>
              <ManagerProvider>
                <AuctionsProvider>
                  <CollectionProvider>
                    <FactoryProvider>
                      <main className="app">
                        <Layout>
                          <Component {...pageProps} />
                        </Layout>
                      </main>
                    </FactoryProvider>       
                  </CollectionProvider>
                </AuctionsProvider>
              </ManagerProvider>
            </UserProvider>
          </ProjectsProvider>
        </ApolloProvider>
      </Web3ReactProvider>
    </>
  );
}

export default CustomApp;
