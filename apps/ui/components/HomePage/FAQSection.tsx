import React from 'react';
import styled from 'styled-components';
import LinkWrapper from '../LinkWrapper';
import MoreDetails from '../MoreDetails';
import Title from '../Title';

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
      <Title>FAQ</Title>
      <br></br>
      <MoreDetailsWrapper>
        <MoreDetails title={'When will Moonpage launch?'}>
          <>
            <p>The Mainnet launch is planned for the end of September 2022.</p>
          </>
        </MoreDetails>
        <br></br>
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
        <MoreDetails title={'What are NFTs?'}>
          <>
            <p>
              If you haven't heard of NFTs yet,{' '}
              <LinkWrapper url="https://www.theverge.com/22310188/nft-explainer-what-is-blockchain-crypto-art-faq">
                this
              </LinkWrapper>{' '}
              is a great introduction.
              <br />
              If you like a slightly more in depth technical introduction, we
              comment{' '}
              <LinkWrapper url="https://blog.opensea.io/guides/non-fungible-tokens/">
                this
              </LinkWrapper>{' '}
              read.
            </p>
          </>
        </MoreDetails>
        <br></br>
        <MoreDetails title={'Why text NFTs?'}>
          <>
            <p>
              PFP NFTs have already taken over the world in summer 2021. But
              NFTs are still a relatively new phenomenon. More areas can be
              explored with the power of NFTs.
              <br />
              Let's take the example of a <i>literature NFT</i>: Text NFTs can
              support writers financially and help them gather a community
              around them. They can unlock exclusive content. But they can also
              be collected and shown off in a digital bookshelf. They could even
              give access to exclusive events, or a right to a DAO vote
              concerning the project. <br />
              Possibilities are endless! You are one of the pioneers exploring
              these possibilities and Moonpage is your tool.
            </p>
          </>
        </MoreDetails>
        <br></br>
        <MoreDetails title={'Why Polygon?'}>
          <>
            <p>
              Polygon is a popular Ethereum Layer 2 scaling solution, that
              allows users to interact with dApps at low transaction fees
              without compromising on security. This is why we chose it. Find
              out more about{' '}
              <LinkWrapper url="https://polygon.technology/">
                Polygon
              </LinkWrapper>
              .
              <br />
              Moonpage will be brought to more networks in the future.
              <br />
            </p>
          </>
        </MoreDetails>
        <br></br>

        <MoreDetails title={'Who is building Moonpage?'}>
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
              The launch to Polygon Mainnet! We will soon publish a Roadmap
              here. But you will be able to connect with the team on Discord and
              Twitter. We are eager to hear what you like to see as the next
              feature.
            </p>
          </>
        </MoreDetails>
      </MoreDetailsWrapper>
    </Root>
  );
};

export default FAQSection;
