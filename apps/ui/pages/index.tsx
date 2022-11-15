import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import styled from 'styled-components';
import ProjectSection from '../components/HomePage/ProjectSection';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import MainSellingPointsSection from '../components/HomePage/MainSellingPointsSection';
import FAQSection from '../components/HomePage/FAQSection';
import StartAnimation from '../components/StartAnimation';
import HowItWorksSection from '../components/HomePage/HowItWorksSection';
import Title from '../components/Title';
import { BG_DARK, MAIN_TEXT_COLOR, POP } from '../themes';
import TypeWriter from '../components/TypeWriter';
import BubbleAnimation from '../components/BubbleAnimation';

const Root = styled.section``;

const HeaderSection = styled.section`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LandingHeader = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 8rem 6rem;

  @media (max-width: 900px) {
    flex-direction: column;
    margin: 2rem;
  }
`;

const LandingAnimationWrapper = styled.section`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LandingAnimation = styled.div`
  width: 500px;
  height: 500px;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const Padding = styled.div`
  height: 3rem;

  @media (max-width: 768px) {
    height: 1.5rem;
  }
`;

export function Index() {
  // const hasTried = useEagerConnect();

  return (
    <Root>
      <Padding />
      <HeaderSection>
        <LandingHeader>
          <Title color={POP} size="s" textAlign="left">
            Text NFT Platform
          </Title>
          <Title
            color={POP}
            padding="1rem 1rem 0 1rem"
            size="xl"
            textAlign="left"
          >
            <TypeWriter
              text={
                'The web3 literature lab. For the first writers on the moon.'
              }
              shouldErase={false}
              shouldLoop={false}
            />
          </Title>

          <Title color={MAIN_TEXT_COLOR} size="s" textAlign="left">
            Moonpage is a free and easy platform for turning your text into
            NFTs.
          </Title>
        </LandingHeader>
        <LandingAnimationWrapper>
          <LandingAnimation>
            <BubbleAnimation />
          </LandingAnimation>
        </LandingAnimationWrapper>
      </HeaderSection>
      <MainSellingPointsSection />
      <ProjectSection />
      <HowItWorksSection />
      {/* top auctions */}
      <FAQSection />
    </Root>
  );
}

export default Index;
