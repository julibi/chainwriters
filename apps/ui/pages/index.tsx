import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import Typewriter from '../components/Typewriter'
import ProjectSection from '../components/ProjectSection'
import { useDeviceDetect } from '../hooks/useDeviceDetect'
import { BG_DARK } from '../themes'

const Root = styled.div`
`;

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 3rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const TypedTextWrapper = styled.div`
  display: flex;
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

export function Index() {
  const { account, chainId } = useWeb3React();
  const isMobile = useDeviceDetect();
  // const hasTried = useEagerConnect();

  return (
    <Root>
      <HeaderSection>
        <TypedTextWrapper>
          <Typewriter typedText={'This is Peppermint Poets. Stay Tuned.'} />
        </TypedTextWrapper>
        <CarouselSpace>This is a carousel that will show parts of the app</CarouselSpace>
      </HeaderSection>
      <ProjectSection />
    </Root>
  );
}

export default Index;