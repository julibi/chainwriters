import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import styled from 'styled-components';
import ProjectSection from '../components/HomePage/ProjectSection';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { BASE_BORDER_RADIUS, BG_DARK, PINK, PLAIN_WHITE } from '../themes';
import MainSellingPointsSection from '../components/HomePage/MainSellingPointsSection';
import FAQSection from '../components/HomePage/FAQSection';
import StartAnimation from '../components/StartAnimation';
import HowItWorksSection from '../components/HomePage/HowItWorksSection';
import BubbleAnimation from '../components/BubbleAnimation';

const Root = styled.div``;

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  margin: 8rem 6rem;

  @media (max-width: 900px) {
    flex-direction: column;
    margin: 2rem;
  }
`;

const TypedTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 400px;
  width: 50%;

  @media (max-width: 900px) {
    align-items: flex-start;
    width: 100%;
    flex: 1;
  }
`;

export function Index() {
  const { account, chainId } = useWeb3React();
  const isMobile = useDeviceDetect();
  const [showMainPoints, setShowMainPoints] = useState<boolean>(false);

  // const hasTried = useEagerConnect();

  return (
    <Root>
      <HeaderSection>
        <TypedTextWrapper>
          <StartAnimation />
        </TypedTextWrapper>
        <BubbleAnimation />
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
