import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {
  SectionTitleWrapper,
  SectionTitle,
} from '../components/HomePage/ProjectSection';
import { PINK } from '../themes';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-block-start: 3rem;
`;

const Content = styled.div`
  padding: 3rem;
`;

const SubHeader = styled.h3`
  font-family: 'Roboto Mono Bold', Serif;
  text-align: center;
`;

const QAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block-end: 3rem;
`;

const CoFoundersWrapper = styled.div`
  margin: 5rem 0 3rem 0;
`;

const CoFounders = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 3rem;
`;

const CoFounder = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  max-width: 1000px;
  display: inline-block;
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

const Introduction = styled.p`
  max-width: 300px;
  text-align: center;
  margin-block-start: 1rem;
`;

const About = () => {
  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>About</SectionTitle>
      </SectionTitleWrapper>
      <Content>
        <QAWrapper>
          <SubHeader>Why Literature NFTs?</SubHeader>
          <Text>{MockText}</Text>
        </QAWrapper>
        <QAWrapper>
          <SubHeader>Why Peppermint Poets?</SubHeader>
          <Text>{MockText}</Text>
        </QAWrapper>
        <QAWrapper>
          <SubHeader>Our Vision</SubHeader>
          <Text>{MockText}</Text>
        </QAWrapper>
        <QAWrapper>
          <SubHeader>Our History</SubHeader>
          <Text>{MockText}</Text>
        </QAWrapper>
        <CoFoundersWrapper>
          <SectionTitleWrapper>
            <SectionTitle>Team</SectionTitle>
          </SectionTitleWrapper>
          <CoFounders>
            <CoFounder>
              <CoFounderImgWrapper>
                <Image
                  src="/Juli.jpg"
                  quality={65}
                  layout="responsive"
                  height={'100%'}
                  width={'100%'}
                  alt={'Co-Founder Olivia'}
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
                  {`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                    ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                    sa dipscing elitr, ...
                  `}
                </Introduction>
              </FounderDescription>
            </CoFounder>
            <CoFounder>
              <CoFounderImgWrapper>
                <Image
                  src="/Livi.jpg"
                  quality={65}
                  layout="responsive"
                  height={'100%'}
                  width={'100%'}
                  alt={'Co-Founder Olivia'}
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
                  {`Olivia Kuderewski is a novelist, independent editor &
                  co-founder of Peppermint Poets. She studied literature and
                  creative writing in Augsburg, Seville and Hildesheim and has
                  worked in publishing houses and literary agencies. Her novel
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
