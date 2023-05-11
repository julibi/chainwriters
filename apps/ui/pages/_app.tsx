import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ApolloProvider } from '@apollo/client';
import { Web3ReactProvider } from '@web3-react/core';
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers';
import {  } from 'styled-components';
import { hotjar } from 'react-hotjar';
import Layout from '../components/Layout';
import {
  BG_NORMAL_DARKMODE,
  BG_NORMAL_LIGHTMODE,
  MAIN_TEXT_COLOR_DARKMODE,
  MAIN_TEXT_COLOR_LIGHTMODE,
} from '../themes';
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
  ThemeProvider,
  BallotsFactoryProvider,
  ProfilesProvider,
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
    background-color: ${BG_NORMAL_LIGHTMODE};
    color: ${MAIN_TEXT_COLOR_LIGHTMODE};
    font-family: 'Inter';

    @media (prefers-color-scheme: dark) {
      background-color: ${BG_NORMAL_DARKMODE};
      color: ${MAIN_TEXT_COLOR_DARKMODE};
    }

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
          Moonpage. The Web3 Literature Lab. For the first writers on the moon.
        </title>
        <meta charSet="utf-8" />
        <meta property="og:locale" content="en_US" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Moonpage. The Web3 Literature Lab. For the first writers on the moon. Moonpage is a free and easy launchpad for turning your text into NFTs. A place for your craft and creative process of writing."
        ></meta>
        <meta property="og:site_name" content="Moonpage" />
        <meta property="og:title" content="Literary NFTs" />
        <meta
          property="og:description"
          content="Moonpage. The Web3 Literature Lab. For the first writers on the moon. Moonpage is a free and easy launchpad for turning your text into NFTs. A place for your craft and creative process of writing."
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
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="GoogleAnalyticsID"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${process.env.NEXT_PUBLIC_GA_ID});`,
        }}
      />
      <Web3ReactProvider getLibrary={getLibrary}>
        <ApolloProvider client={client}>
          <ToastContainer />
          <ProjectsProvider>
            <UserProvider>
              <ManagerProvider>
                <AuctionsProvider>
                  <CollectionProvider>
                    <FactoryProvider>
                      <ProfilesProvider>
                        <ThemeProvider>
                          <BallotsFactoryProvider>
                            <main className="app">
                              <Layout>
                                <Component {...pageProps} />
                              </Layout>
                            </main>
                          </BallotsFactoryProvider>
                        </ThemeProvider>
                      </ProfilesProvider>
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
