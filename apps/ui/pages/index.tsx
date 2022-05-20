import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import Typewriter from '../components/Typewriter'
import ProjectSection from '../components/ProjectSection'
import { useDeviceDetect } from '../hooks/useDeviceDetect'

const Root = styled.div`
`;

const HeaderSection = styled.section`
  display: flex;
  padding: 3rem;
`;

const TypedTextWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 600px;
  width: 800px;
`;

const Blocker = styled.div`
  flex: 1;
  height: 600px;
`;

export function Index() {
  const { account, chainId } = useWeb3React();
  const isMobile = useDeviceDetect();
  // const hasTried = useEagerConnect();

  if (chainId !== 80001) {
    return (
      <TypedTextWrapper>
        <Typewriter typedText={'This is Peppermint Poets. Stay Tuned.'} />
      </TypedTextWrapper>
    );
  }

  return (
    <Root>
      <HeaderSection>
        <TypedTextWrapper>
          <Typewriter typedText={'This is Peppermint Poets. Stay Tuned.'} />
        </TypedTextWrapper>
      </HeaderSection>
      <ProjectSection />
    </Root>
  );
}

export default Index;