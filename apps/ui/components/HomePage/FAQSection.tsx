import React from 'react';
import styled from 'styled-components';
import LinkWrapper from '../LinkWrapper';
import MoreDetails from '../MoreDetails';
import { SectionTitle, SectionTitleWrapper } from './ProjectSection';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8rem 8rem 8rem;

  @media (max-width: 900px) {
    padding: 0 2rem 2rem 2rem;
  }
`;

const MoreDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

// add matic to your wallet

const FAQSection = () => {
  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>FAQ</SectionTitle>
      </SectionTitleWrapper>
      <br></br>
      <MoreDetailsWrapper>
        <MoreDetails title={'What do I need to interact with the platform?'}>
          <>
            <p>
              First off, you need a crypto wallet. We recommend{' '}
              <LinkWrapper url="https://metamask.io/download/">
                MetaMask
              </LinkWrapper>
              . It is a browser wallet that is easy to create and use. You can
              find a step by step guide on how to setup a wallet{' '}
              <LinkWrapper url="https://medium.com/robotos/how-to-setup-a-crypto-wallet-to-buy-nfts-4a5ce37b8159">
                here
              </LinkWrapper>
              .
              <br />
              Also, it would be good to have some MATIC tokens in your wallet.
              MATIC is the coin used on the Polygon Network. You can purchase
              MATIC on a dex like{' '}
              <LinkWrapper url="https://app.uniswap.org/#/swap?chain=mainnet">
                UniSwap
              </LinkWrapper>{' '}
              or a centralized exchange like{' '}
              <LinkWrapper url="https://www.coinbase.com/">
                Coinbase
              </LinkWrapper>
              .
            </p>
          </>
        </MoreDetails>
        <br></br>
        <MoreDetails title={'What are NFTs'}>
          <>
            <p>
              If you haven't heard of NFTs yet, you have been living under a
              rock! Juli, continue here.
              <LinkWrapper url="https://blog.opensea.io/guides/non-fungible-tokens/">
                This
              </LinkWrapper>{' '}
              is a great introduction, if you want to understand what NFTs are.
            </p>
          </>
        </MoreDetails>
        <br></br>
        <MoreDetails title={'Why collect literature NFTs?'}>
          <>
            <p>
              Fun, Support Writers, Access, show off ur bookshelf (show off who
              u are!)
            </p>
          </>
        </MoreDetails>
        <br></br>
        <MoreDetails title={'Why Polygon?'}>
          <>
            <p>
              Polygon is a popular Ethereum Layer 2 scaling solution, that
              allows users to interact with dApps at low transaction fees
              without compromising on security. Read more about Polygon{' '}
              <LinkWrapper url="https://polygon.technology/">here</LinkWrapper>.
              <br />
              Moonpage will be brought to more networks in the future.
            </p>
          </>
        </MoreDetails>
        <br></br>
        <MoreDetails
          title={
            'When I publish a text with Moonpage, can I still be published by a publishing house?'
          }
        >
          <>
            <p>Mention IPFS! Transparent Code.</p>
          </>
        </MoreDetails>
        <br></br>
        <MoreDetails title={'Rights and Ownership'}>
          <>
            <p>If anything we pause the according ERC-1155 contract.</p>
          </>
        </MoreDetails>
        <br></br>
        <MoreDetails title={'Who is building Moonpage'}>
          <>
            <p>
              <LinkWrapper url="/about#founders">Us</LinkWrapper> :)
            </p>
          </>
        </MoreDetails>
        <br></br>
        <MoreDetails title={'What is next?'}>
          <>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </p>
          </>
        </MoreDetails>
      </MoreDetailsWrapper>
    </Root>
  );
};

export default FAQSection;
