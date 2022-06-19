import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import styled from 'styled-components';
import ProjectSection from '../components/HomePage/ProjectSection';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { BG_DARK, PINK, PLAIN_WHITE } from '../themes';
import MainSellingPointsSection from '../components/HomePage/MainSellingPointsSection';
import FAQSection from '../components/HomePage/FAQSection';
import StartAnimation from '../components/StartAnimation';

const Root = styled.div``;

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 8rem;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 2rem;
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

  @media (max-width: 900px) {
    width: 100%;
    flex: 1;
  }
`;

const Stress = styled.span`
  display: inline-block;
  animation: stress ease 3s;

  @keyframes stress {
    0% {
      color: ${PLAIN_WHITE};
      font-size: 16px;
    }
    100% {
      color: ${PINK};
      font-size: 32px;
    }
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
          This is a carousel that will show parts of the app
        </CarouselSpace>
      </HeaderSection>
      <MainSellingPointsSection />
      <ProjectSection />
      <ProjectSection />
      <FAQSection />
    </Root>
  );
}

export default Index;
