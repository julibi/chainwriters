import { FONT_SERIF_REGULAR, POP } from '../../themes';
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

const FAQAnswer = styled.p`
  font-family: ${FONT_SERIF_REGULAR};
`;

// add matic to your wallet

const FAQSection = () => {
  return (
    <Root>
      <Title color={POP}>FAQ</Title>
      <br></br>
      <MoreDetailsWrapper>
        <MoreDetails title={'What do I need to interact with the platform?'}>
          <>
            <FAQAnswer>
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
            </FAQAnswer>
          </>
        </MoreDetails>
        <br></br>
        <MoreDetails title={'Why literary NFTs?'}>
          <>
            <FAQAnswer>
              PFP NFTs have already taken over the world in summer 2021. But
              NFTs are still a relatively new phenomenon. More areas can be
              explored with the power of NFTs.
              <br />
              Let's take the example of a literary NFT:they can support writers
              financially and help them gather a community around them. They can
              unlock exclusive content. But they can also be collected and shown
              off in a digital bookshelf. They could even give access to
              exclusive events, or a right to a DAO vote concerning the project.{' '}
              <br />
              Possibilities are endless! You are one of the pioneers exploring
              these possibilities and Moonpage is your tool.
            </FAQAnswer>
          </>
        </MoreDetails>
        <br></br>

        <MoreDetails title={'Who is building Moonpage?'}>
          <>
            <FAQAnswer>
              <LinkWrapper url="/about#founders">Us</LinkWrapper> :)
            </FAQAnswer>
          </>
        </MoreDetails>
      </MoreDetailsWrapper>
    </Root>
  );
};

export default FAQSection;
