import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import styled from 'styled-components';
import ProjectSection from '../components/HomePage/ProjectSection';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import MainSellingPointsSection from '../components/HomePage/MainSellingPointsSection';
import FAQSection from '../components/HomePage/FAQSection';
import StartAnimation from '../components/StartAnimation';
import HowItWorksSection from '../components/HomePage/HowItWorksSection';

const Root = styled.section``;

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  margin: 8rem 6rem;

  @media (max-width: 900px) {
    flex-direction: column;
    margin: 2rem;
  }
`;

const Padding = styled.div`
  height: 3rem;

  @media (max-width: 768px) {
    height: 1.5rem;
  }
`;

export function Index() {
  const { account, chainId } = useWeb3React();
  const isMobile = useDeviceDetect();
  const [showMainPoints, setShowMainPoints] = useState<boolean>(false);

  // const hasTried = useEagerConnect();

  return (
    <Root>
      <Padding />
      <HeaderSection>
        <StartAnimation />
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
