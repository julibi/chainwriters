import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {
  SectionTitleWrapper,
  SectionTitle,
} from '../components/HomePage/ProjectSection';
import { PINK, INTER_BOLD } from '../themes';
import LinkWrapper from '../components/LinkWrapper';

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
  font-family: ${INTER_BOLD};
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

const MockText = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
takimata sanctus est Lorem ipsum dolor sit amet.`;

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

const StyledLink = styled.a`
  color: ${PINK};
  text-decoration: none;
  font-family: ${INTER_BOLD};
  margin-block-end: 1rem;
`;

const PunchLine = styled.span`
  font-size: 24px;
  text-align: left;
  line-height: 2;
`;

const Name = styled.span`
  display: inline-block;
  font-family: ${INTER_BOLD};
`;

const Title = styled.span`
  display: inline-block;
  font-family: ${INTER_BOLD};
`;

const Field = styled.span`
  display: inline-block;
  font-family: ${INTER_BOLD};
`;

const Introduction = styled(Text)`
  max-width: 300px;
  text-align: center;
  margin-block-start: 1rem;
`;

const About = () => {
  return (
    <Root>
      <SectionTitleWrapper style={{ marginBlockEnd: '-4rem' }}>
        <SectionTitle>About</SectionTitle>
      </SectionTitleWrapper>
      <Content>
        <QAWrapper>
          <SubHeader>Why Text NFTs?</SubHeader>
          <Text>{`What if you, as a writer, could publish your writings, earn the lion share, receive royalties and create communities around your work – all of this settled in a DAO, where the rules are coded in an immutable ledger?`}</Text>
          <Text>{`There is an insane amount of visual digital collectibles but text NFTs aren’t as common yet – the flashy avantgarde among writers has just started to use the blockchain to publish their art. `}</Text>
          <Text>{`Instead of struggling with the traditional bookmarket and its gatekeepers you can experiment with new digital forms and keep total control over the whole process. Choose your own collaborators, price, number of copies and form of your texts and be part of a web 3 literary movement.`}</Text>
          <Text>{`And NFT collectors beware: you never know if there’s a hidden J.K. Rowling or Stephen King among these web 3 poets … Browse projects, read brand new stuff, get your literature NFTs of hidden future stars and see them moon! Who knows? You could be owning a next gen blue chip NFT.`}</Text>
        </QAWrapper>
        <QAWrapper>
          <SubHeader>Why Moonpage?</SubHeader>
          <Text>{`Using Moonpage is easy – there’s a simple creation flow and we also guide you through the steps. If you’re a literal bookworm and don’t know the web3 space so well, no worries, we got ya!`}</Text>
          <Text>{`Since it‘s the only all-text NFT platform that combines minting and selling you don’t have to switch to other spaces. You create and sell all in one place.`}</Text>
          <Text>{`And you’ll be among kindred spirits – we want to build a strong community since writing can be a very lonely business. So don’t be shy, visit our Dischord and Twitter Channel and get connected to other poets, literature lovers and collectors. `}</Text>
          <Text>{`And this is just the beginning of this community… in the future we want to explore more innovative ways how we can connect writers, readers and blockchain technology. Stay tuned :) – and please... don't sleep on it!`}</Text>
        </QAWrapper>
        <QAWrapper>
          <SubHeader>Our Vision</SubHeader>
          <Text>
            {/* sehr beschränkt auf die Autoren */}
            <PunchLine>
              A breaking ground for the literature of the future
            </PunchLine>
            <br />
          </Text>
          <Text>{`As much as we love traditional books, we believe there are many
            forms in which literature can be explored. Publishing houses are
            doing a great job finding and forming talent and maintaining a high
            level of quality, but they are also strong gatekeepers.`}</Text>
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
            {`After exchanging experiences of being a young, struggling
            writer and discussing how web3 technology and publishing could be
            merged into something that would address many of the pain points in
            the publishing industry that we had encountered, we knew
            immediately, what we had to do: Moonpage.`}
          </Text>
        </QAWrapper>
        <CoFoundersWrapper>
          <SectionTitleWrapper>
            <SectionTitle>Team</SectionTitle>
          </SectionTitleWrapper>
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
                <StyledLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/hyun-kyung-yi-b31448138/"
                >
                  <Name>Hyun-Kyung</Name>
                </StyledLink>
                <Title>Co-Founder</Title>
                <Field>Software Engineer</Field>
                <Introduction>
                  Hyun-Kyung is an experienced developer specialising in Web3.
                  As a software engineer she has contributed to multiple
                  prestigious NFT projects such as{' '}
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
                  alt={'Co-Founder Olivia'}
                  priority
                />
              </CoFounderImgWrapper>
              <FounderDescription>
                <StyledLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/olivia-kuderewski-1a1884173/"
                >
                  <Name>Olivia</Name>
                </StyledLink>
                <Title>Co-Founder</Title>
                <Field>Marketing & Community Manager</Field>
                <Introduction>
                  {`Olivia Kuderewski is a novelist and editor. Her novel
                  "Lux" was awarded the Klaus Michael Kühne Prize for the best
                  German-language debut in 2021. In 2022, her second novel "Haha
                  Heartbreak" will be published by Voland & Quist.`}
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
