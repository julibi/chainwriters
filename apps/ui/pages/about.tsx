import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { POP, FONT_SERIF_BOLD, StyledLink } from '../themes';
import LinkWrapper from '../components/LinkWrapper';
import Title from '../components/Title';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-block-start: 3rem;
`;

const Content = styled.div`
  padding: 3rem;

  @media (max-width: 900px) {
    padding: 0;
  }
`;

const SubHeader = styled.h3`
  font-family: ${FONT_SERIF_BOLD};
  text-align: center;
  font-size: 32px;
`;

const QAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 2rem;
`;

const CoFoundersWrapper = styled.div`
  margin: 5rem 0 3rem 0;

  @media (max-width: 900px) {
    margin: 5rem 0 2rem 0;
  }
`;

const CoFounders = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 3rem;

  @media (max-width: 900px) {
    padding: 3rem 2rem;
  }
`;

const CoFounder = styled.div`
  display: flex;
  flex-direction: column;
`;

const CoFounderWithMarginBottom = styled(CoFounder)`
  @media (max-width: 900px) {
    margin-block-end: 3rem;
  }
`;

const Text = styled.p`
  max-width: 1000px;
  display: inline-block;
  font-size: 18px;
  line-height: 24px;

  :after {
    content: '';
    width: 100%;
    height: 1em;
    display: inline-block;
  }
`;

const CoFounderImgWrapper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  margin-block-end: 3rem;

  span {
    width: 100% !important;
    height: 100% !important;

    img {
      object-fit: cover;
      // filter: grayscale(100%);
    }
  }
`;

const FounderDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.span`
  display: inline-block;
  font-family: ${FONT_SERIF_BOLD};
  color: ${POP};
`;

const Field = styled.span`
  display: inline-block;
  font-family: ${FONT_SERIF_BOLD};
`;

const Introduction = styled(Text)`
  max-width: 300px;
  text-align: center;
  margin-block-start: 1rem;
`;

const About = () => {
  return (
    <Root>
      <Title>About</Title>
      <Content>
        <StyledLink href="https://docs.moonpage.io/">
          <Title size="m" color={POP}>
            Read the Moonpage Light Paper
          </Title>
        </StyledLink>

        <QAWrapper>
          <SubHeader>Why Text NFTs?</SubHeader>
          <Text>{`What if you, as a writer, could publish your writings, earn the lion share, receive royalties and create communities around your work – all of this settled in a smart contract, where the rules are coded in an immutable ledger?`}</Text>
          <Text>{`There is an insane amount of visual digital collectibles but text NFTs aren’t as common yet – the flashy avantgarde among writers has just started to use the blockchain to publish their art. `}</Text>
          <Text>{`Instead of struggling with the traditional bookmarket and its gatekeepers you can experiment with new digital forms and keep total control over the whole process. Choose your own collaborators, price, number of copies and form of your texts and be part of a web3 literary movement.`}</Text>
          <Text>{`And NFT collectors beware: you never know if there’s a hidden J.K. Rowling or Stephen King among these web3 poets … Browse projects, read brand new stuff, get your text NFTs of hidden future stars and see them moon! Who knows? You could be owning a next gen blue chip NFT.`}</Text>
        </QAWrapper>
        <QAWrapper>
          <SubHeader>Why Moonpage?</SubHeader>
          <Text>{`Using Moonpage is easy – there’s a simple creation flow and we also guide you through the steps. If you’re a literal bookworm and don’t know the web3 space so well, no worries, we got ya! It‘s one of the first all-text NFT launchpads that empowers you to create and sell, all in one place.`}</Text>
          <Text>{`And you’ll be among kindred spirits – we want to build a strong community since writing can be a very lonely business. So don’t be shy, visit our Telegram and Twitter Channel and get connected to other poets, literature lovers and collectors. `}</Text>
          <Text>{`This is just the beginning of this community. In the future we want to find more innovative ways to connect writers, readers and blockchain technology. Stay tuned and please don't sleep on it!`}</Text>
        </QAWrapper>
        <QAWrapper>
          <SubHeader>Our Vision</SubHeader>
          <Text>{`As much as we love traditional books, we believe there are many
            forms in which literature can be explored. Publishing houses are
            doing a great job finding and forming talent and maintaining a high
            level of quality, but they can be gatekeepers.`}</Text>
          <Text>{`A lot of
            writers – especially young ones – struggle to find a platform for
            their writing. „Gifted, bohemian, penniless writer“ might sound cool
            in theory but in reality it’s a frustrating hassle. Trust us, we‘ve
            been there ourselves!`}</Text>
          <Text>
            {`In web3 it’s easier for creative writers to
            reach their readers directly and experiment with their art, besides
            earning crypto currency for their text NFTs empowers them
            financially. So why not infuse publishing with the possibilities and
            the sheer fun and craziness of NFTs?`}
          </Text>
        </QAWrapper>
        <QAWrapper>
          <SubHeader>Our History</SubHeader>
          <Text>{`We met in Hildesheim, Germany, in 2014, where we both studied
            Creative Writing. Works of Jack Kerouac, Bret Easton Ellis, Lucia
            Berlin, Leo Tolstoi and many more make our hearts beat faster! A few
            years after graduation Olivia had become a published and awarded
            writer and Hyun-Kyung had professionally immersed herself in web3
            code.`}</Text>
          <Text>
            {`After exchanging experiences of struggling as a writer and discussing
            how web3 technology could open new spaces for literature, we knew
            immediately, what we had to do: Moonpage.`}
          </Text>
        </QAWrapper>
        <CoFoundersWrapper>
          <Title>Team</Title>
          <CoFounders id="founders">
            <CoFounderWithMarginBottom>
              <CoFounderImgWrapper>
                <Image
                  src="/Juli.jpg"
                  quality={65}
                  layout="responsive"
                  height={'100%'}
                  width={'100%'}
                  alt={'Co-Founder Olivia'}
                  priority
                />
              </CoFounderImgWrapper>
              <FounderDescription>
                <Name>Juli</Name>
                <Field>Software Engineer</Field>
                <Field>Founder</Field>
                <Introduction>
                  Experienced developer specialising in Web3. As a software
                  engineer she has contributed to multiple well-known NFT
                  projects such as{' '}
                  <LinkWrapper url="https://www.polychainmonsters.com">
                    Polychain Monsters
                  </LinkWrapper>
                  {' ,'}
                  <LinkWrapper url="https://playlostglitches.com/">
                    The Lost Glitches
                  </LinkWrapper>
                  {' and '}
                  <LinkWrapper url="https://www.unic.ly/">Unicly</LinkWrapper>.
                </Introduction>
              </FounderDescription>
            </CoFounderWithMarginBottom>
            <CoFounder>
              <CoFounderImgWrapper>
                <Image
                  src="/Livitest.png"
                  quality={65}
                  layout="responsive"
                  height={'100%'}
                  width={'100%'}
                  alt={'Olivia'}
                  priority
                />
              </CoFounderImgWrapper>
              <FounderDescription>
                <Name>Olivia</Name>
                <Field>Marketing</Field>
                <Introduction>
                  Novelist and editor. Her novel{' '}
                  <LinkWrapper url="https://www.amazon.com/-/de/dp/B08S1SKVTB/ref=sr_1_1?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=DYX2ZZ93KK68&keywords=lux+olivia+kuderewski&qid=1658173221&sprefix=lux+olivia+kuderewski%2Caps%2C140&sr=8-1">
                    Lux
                  </LinkWrapper>{' '}
                  was awarded the Prize of the Harbour Front Literature Festival
                  for the best German-language debut in 2021. In 2022, her
                  second novel{' '}
                  <LinkWrapper url="https://www.amazon.com/-/de/dp/B0B9T2H2ZQ/ref=sr_1_5?keywords=haha+heartbreak&qid=1665576640&qu=eyJxc2MiOiItMC4wMSIsInFzYSI6IjAuMDAiLCJxc3AiOiIwLjAwIn0%3D&sprefix=haha+heart%2Caps%2C161&sr=8-5">
                    Haha Heartbreak
                  </LinkWrapper>{' '}
                  was published by Voland & Quist.
                </Introduction>
              </FounderDescription>
            </CoFounder>
          </CoFounders>
        </CoFoundersWrapper>
      </Content>
    </Root>
  );
};

export default About;
