import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { Web3ReactProvider } from '@web3-react/core';
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers';
import { createGlobalStyle } from 'styled-components';
import { hotjar } from 'react-hotjar';
import Layout from '../components/Layout';
import { BG_NORMAL, MAIN_TEXT_COLOR } from '../themes';
import './styles.css';
import ToastContainer from '../components/ToastContainer';
import client from '../apolloclient';
import {
  AuctionsProvider,
  CollectionProvider,
  FactoryProvider,
  ManagerProvider,
  ProjectsProvider,
  UserProvider,
} from '../providers';
import * as gtag from '../utils/ga';

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
    color: ${MAIN_TEXT_COLOR};
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

    @font-face {
      font-family: "Merriweather Light";
      src: url("/fonts/Merriweather/Merriweather-Light.ttf");
      font-style: variable;
      font-display: swap;
    }

    @font-face {
      font-family: "Merriweather";
      src: url("/fonts/Merriweather/Merriweather-Regular.ttf");
      font-style: variable;
      font-display: swap;
    }

    @font-face {
      font-family: "Merriweather Bold";
      src: url("/fonts/Merriweather/Merriweather-Bold.ttf");
      font-style: variable;
      font-display: swap;
    }

    @font-face {
      font-family: "Merriweather Black";
      src: url("/fonts/Merriweather/Merriweather-Black.ttf");
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
  const router = useRouter();
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.NEXT_PUBLIC_HOTJAR_ID),
      Number(process.env.NEXT_PUBLIC_HOTJAR_SV)
    );
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>
          Moonpage. The future of text. Create and collect text NFTs.
        </title>
        <meta charSet="utf-8" />
        <meta property="og:locale" content="en_US" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#1B1E28" />
        <meta
          name="description"
          content="Enter the future of text. Create and collect text NFTs.  Moonpage is a launchpad where creators and writers can turn their projects into text NFTs."
        ></meta>
        <meta property="og:site_name" content="Moonpage" />
        <meta property="og:title" content="Text NFTs" />
        <meta
          property="og:description"
          content="Enter the future of text. Create and collect text NFTs. Moonpage is a launchpad where creators and writers can turn their projects into text NFTs."
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://www.moonpage.io/website.png"
        />
        <meta property="og:url" content="http://www.moonpage.io" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NX_PUBLIC_GA_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${process.env.NX_PUBLIC_GA_ID});`,
          }}
        ></script>
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
