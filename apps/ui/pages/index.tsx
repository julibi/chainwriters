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

const Root = styled.div``;

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 8rem 6rem;

  @media (max-width: 900px) {
    flex-direction: column;
    margin: 2rem;
  }
`;

const TypedTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 50%;

  @media (max-width: 900px) {
    align-items: flex-start;
    width: 100%;
    flex: 1;
  }
`;

const CarouselSpace = styled.div`
  min-height: 500px;
  width: 50%;
  background-color: ${BG_DARK};
  border-radius: 20px;
  padding: 1rem;
  margin-inline-start: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 900px) {
    width: 100%;
    flex: 1;
    margin-inline-start: 0;
    margin-block-start: 3rem;
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
        <CarouselSpace>
          <span style={{ display: 'inlineBlock' }}>
            This is a carousel that will loop through the cover images!
          </span>
        </CarouselSpace>
      </HeaderSection>
      <MainSellingPointsSection />
      <HowItWorksSection />
      <ProjectSection />
      {/* exchange with top auctions */}
      <ProjectSection />
      <FAQSection />
    </Root>
  );
}

export default Index;
