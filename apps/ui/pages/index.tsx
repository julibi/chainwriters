import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import Typewriter from '../components/Typewriter'
import ProjectSection from '../components/ProjectSection'
import { useDeviceDetect } from '../hooks/useDeviceDetect'

const Root = styled.div``;

const HeaderSection = styled.section`
  display: flex;
  padding: 3rem;
`;

const TypedTextWrapper = styled.div`
  flex: 1;
  height: 600px;
  width: 800px;
`;

const Blocker = styled.div`
  flex: 1;
  height: 600px;
`;

export function Index() {
  const { account } = useWeb3React();
  const isMobile = useDeviceDetect();
  // const hasTried = useEagerConnect();

  return (
    <Root>
      <HeaderSection>
        <TypedTextWrapper>
          <Typewriter typedText={'This is MOONLIT. On the left, imagine seeing a nice logo or animated illustration :)'} />
        </TypedTextWrapper>
      </HeaderSection>
      <ProjectSection />
    </Root>
  );
}

export default Index;