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

const FAQSection = () => {
  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>FAQ</SectionTitle>
      </SectionTitleWrapper>
      <br></br>
      <MoreDetailsWrapper>
        <MoreDetails
          title={
            'I am new to Crypto. What do I need to interact with the platform?'
          }
        >
          <>
            <p>
              First off, you need a crypto wallet. We recommend{' '}
              <LinkWrapper url="https://metamask.io/download/">
                MetaMask
              </LinkWrapper>
              . It is a browser wallet that is easy and fast to create and use.
              You can also find a step by step guide{' '}
              <LinkWrapper url="https://medium.com/robotos/how-to-setup-a-crypto-wallet-to-buy-nfts-4a5ce37b8159">
                here
              </LinkWrapper>
              .
            </p>
          </>
        </MoreDetails>
        <br></br>
        <MoreDetails title={'NF... tea.. wut?!'}>
          <>
            <p>
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
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. Polygon is an amazing scaling solution
              for the Ethereum blockchain that keeps transaction fees low
              without sacrificing on security. Learn more about it{' '}
              <LinkWrapper url="https://polygon.technology/">here</LinkWrapper>.
              Peppermint Poets will be brought to more networks in the future.
            </p>
          </>
        </MoreDetails>
        <br></br>
        <MoreDetails
          title={'Is it safe to publish and collect on Peppermint Poets?'}
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
        <MoreDetails title={'Who is building Peppermint Poets?'}>
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
