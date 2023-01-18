import styled from 'styled-components';
import ProjectSection from '../components/HomePage/ProjectSection';
import MainSellingPointsSection from '../components/HomePage/MainSellingPointsSection';
import FAQSection from '../components/HomePage/FAQSection';
import HowItWorksSection from '../components/HomePage/HowItWorksSection';
import HeaderSection from '../components/HomePage/HeaderSection';
import Roadmap from '../components/HomePage/Roadmap';
// import VotingsSection from '../components/HomePage/VotingsSection';

const Root = styled.section``;

const Padding = styled.div`
  height: 3rem;

  @media (max-width: 768px) {
    height: 1.5rem;
  }
`;

export function Index() {
  return (
    <Root>
      <Padding />
      <HeaderSection />
      <MainSellingPointsSection />
      <ProjectSection />
      {/* <VotingsSection /> */}
      <HowItWorksSection />
      <Roadmap />
      {/* top auctions */}
      <FAQSection />
    </Root>
  );
}

export default Index;
