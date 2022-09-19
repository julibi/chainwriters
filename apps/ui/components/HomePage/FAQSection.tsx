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
            <p>The Mainnet launch is planned for the beginning of August.</p>
          </>
        </MoreDetails>
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
              is a great introduction, if you want to understand what NFTs are.
              <br />
              If you like a slightly more in depth technical introduction, read{' '}
              <LinkWrapper url="https://blog.opensea.io/guides/non-fungible-tokens/">
                this
              </LinkWrapper>
              .
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
              Let's take the example of a <i>literature NFT</i>.
              <br />
              For creators:
              <br />
              Text NFTs can support writers financially and help them gather a
              community around them.
              <br />
              For collectors:
              <br />
              Of course they can be used to unlock exclusive content. But they
              can also be collected and shown off in a digital bookshelf. NFT
              owners can join communities with them. They can even give access
              to exclusive events, or a right to a DAO vote considering the
              project. As an early supporter you could get a share of the
              royalties of the project. Possibilities are endless! You are one
              of the pioneers exploring these possibilities and Moonpage is the
              tool you can use for it.
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
              The barrier to create and collect NFTs should be low. Hence
              Moonpage is aiming to keep the transaction at a minimum. At the
              same time, we want to ensure maximum security for text NFTs. This
              is why we chose Polygon as the first network on which projects can
              launch. It meets all the criteria mentioned and furthermore is a
              broadly adopted network.
              <br />
              Moonpage will be brought to more networks in the future. Voice
              your opinion about the next favorable network in our Discord
              Channel! There might even be a DAO vote about this in the near
              future...
              <br />
            </p>
          </>
        </MoreDetails>
        <br></br>
        <MoreDetails
          title={
            'When launching a text NFT on Moonpage as an author, can my text still be published by a publishing house?'
          }
        >
          <>
            <p>
              This depends on the deal you have with your publishing house or
              agency. If the publishing house gets the rights for your text in
              all forms (print AND digital), don't publish the text on Moonpage
              directly. Instead, reach out to us first!
              <br />
              Generally speaking: even if you have a contract with a publisher
              already, it is possible from our side.
              <br />
              We are open to collaborate with publishers. Authors can launch
              their text as NFT collection and add the publishers as
              contributors. In this way, everyone profits.
            </p>
          </>
        </MoreDetails>
        <br></br>
        <MoreDetails title={'Copyright and Ownership'}>
          <>
            <p>
              Neither Moonpage nor NFT holders own text. The ownership remains
              with the creators. Moonpage accepts no liability for copyright
              infringements. Please inform us via mail when you notice an
              infringement. Moonpage will investigate and in case of
              confirmation, we will immediately pause the NFT contract. Pausing
              disables any interaction with the contract and freezes the funds
              in it.
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
              The launch to Polygon Mainnet of course! We will soon publish a
              Roadmap on this landing page. But you will be able to connect with
              the team on Discord and Twitter. We are eager to hear what you
              like to see as the next feature.
            </p>
          </>
        </MoreDetails>
      </MoreDetailsWrapper>
    </Root>
  );
};

export default FAQSection;
