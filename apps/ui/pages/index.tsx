import styled from 'styled-components';
import ProjectSection from '../components/HomePage/ProjectSection';
import MainSellingPointsSection from '../components/HomePage/MainSellingPointsSection';
import FAQSection from '../components/HomePage/FAQSection';
import HowItWorksSection from '../components/HomePage/HowItWorksSection';
import Title from '../components/Title';
import { MAIN_TEXT_COLOR, POP } from '../themes';
import TypeWriter from '../components/TypeWriter';
import BubbleAnimation from '../components/BubbleAnimation';
import ActionButton from '../components/ActionButton';
import { useRouter } from 'next/router';

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
  margin: 10rem 8rem 12rem 8rem;

  @media (max-width: 900px) {
    flex-direction: column;
    margin: 2rem;
  }
`;

const Buttons = styled.div``;

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
  const router = useRouter();
  return (
    <Root>
      <Padding />
      <HeaderSection>
        {/* move all this into a lander component */}
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
            The web3 literature lab.
          </Title>
          <Title
            color={POP}
            padding="1rem 1rem 0 1rem"
            size="xl"
            textAlign="left"
          >
            For the first writers on the moon.
          </Title>
          <Title color={MAIN_TEXT_COLOR} size="s" textAlign="left">
            Moonpage is a free and easy platform for turning your text into
            NFTs.
          </Title>
          <Buttons>
            <ActionButton
              onClick={() => router.push('/create')}
              loading={false}
              text="Create"
              margin="3rem 0 0 0"
            />
            <ActionButton
              onClick={() => {}}
              loading={false}
              disabled
              text="Watch Demo"
              margin="3rem 0 0 2rem"
              color={MAIN_TEXT_COLOR}
            />
          </Buttons>
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
