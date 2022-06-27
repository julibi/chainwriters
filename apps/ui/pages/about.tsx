import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {
  SectionTitleWrapper,
  SectionTitle,
} from '../components/HomePage/ProjectSection';
import { PINK } from '../themes';
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
  font-family: 'Roboto Mono Bold', Serif;
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
  font-family: 'Roboto Mono Bold';
  margin-block-end: 1rem;
`;

const PunchLine = styled.span`
  font-size: 24px;
  text-align: left;
  line-height: 2;
`;

const Name = styled.span`
  display: inline-block;
  font-family: 'Roboto Mono Bold';
`;

const Title = styled.span`
  display: inline-block;
  font-family: 'Roboto Mono Bold';
`;

const Field = styled.span`
  display: inline-block;
  font-family: 'Roboto Mono Bold';
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
          <SubHeader>Why Literature NFTs?</SubHeader>
          <Text>{MockText + 'Literature NFTs are just the beginning.'}</Text>
        </QAWrapper>
        <QAWrapper>
          <SubHeader>Why Peppermint Poets?</SubHeader>
          <Text>{MockText}</Text>
        </QAWrapper>
        <QAWrapper>
          <SubHeader>Our Vision</SubHeader>
          <Text>
            {/* sehr beschränkt auf die Autoren */}
            <PunchLine>
              A breaking ground for the literature of the future.
            </PunchLine>
            <br />
            As much as we love traditional books, we believe there are many more
            forms in which literature can be explored. Publishing houses are
            doing a great job finding and forming talent and maintaining a high
            level of quality. But they are also strong gatekeepers. A lot of
            writers - especially young writers – struggle to find a platform for
            their writing. A gifted, bohemian, penniless writer... – might sound
            cool in theory. But more often than not, it's a frustrating hassle.
            Trust us, we know, because we have been there ourselves!
          </Text>
          <Text>
            But we are convinced that there should be many more opportunities
            for creative writers to reach their readers and experiment with
            their art. We are striving to provide an excellent service that
            allows them to do so in a fun an innovative way with blockchain
            technology. We want to financially empower the authors, by earning
            crypto currency for their literature NFTs.
          </Text>
          <Text>
            So why not infuse publishing with the possibilities and the sheer
            fun and craziness of NFTs? What if you could publish, earn the lion
            share, receive royalties, create communities around your work, and
            all of this settled in a DAO, where the rules are coded in an
            immutable ledger? Doesn't it sound awesome?!
          </Text>
          <Text>
            This is just the beginning of this community. In the future we want
            to explore more innovative ways that we can connect writers, and
            cutting edge tech. Stay tuned :) – and please... don't sleep on it!
          </Text>
        </QAWrapper>
        <QAWrapper>
          <SubHeader>Our History</SubHeader>
          <Text>
            We met in Hildesheim, Germany, in 2014, where we both studied
            Creative Writing. Works of Jack Kerouac, Breat Easton Ellis, Lucia
            Berlin, Leo Tolstoi and many more make our hearts beat faster! A few
            years in after graduation Olivia had become a published and awarded
            writer and Hyun-Kyung had professionally immersed herself in web3
            code. After exchanging experiences of being a young, struggling
            writer and discussing how web3 technology and publishing could be
            merged into something that would address many of the pain points in
            the publishing industry that we had encountered, we knew
            immediately, what we had to do. Something that has never been done
            in this form: Peppermint Poets.
          </Text>
          <Text></Text>
          <Text></Text>
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
                  prestigious NFT businesses and projects such as{' '}
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
                  src="/Livi.png"
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
                  Heartbreak" will be published by Voland & Quist. She lives and
                  works in Berlin.`}
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
