import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import Typewriter from '../components/Typewriter'
import ProjectSection from '../components/ProjectSection'

const Root = styled.div``;

const HeaderSection = styled.section`
  display: flex;
  padding: 3rem;
`;

const HeaderIllustration = styled.div`
  height: 600px;
  flex: 1;
`;

const TypedTextWrapper = styled.div`
  flex: 1;
  min-height: 650px;
`;



export function Index() {
  const { account } = useWeb3React();
  // const hasTried = useEagerConnect();

  return (
    <Root>
      <HeaderSection>
        <HeaderIllustration />
        <TypedTextWrapper>
          <Typewriter typedText={'This is MOONLIT. On the left, imagine seeing a nice logo or animated illustration :)'} />
        </TypedTextWrapper>
      </HeaderSection>
      <ProjectSection />
    </Root>
  );
}

export default Index;