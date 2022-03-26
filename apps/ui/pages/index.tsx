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

const Moon = styled.div`
  // background-color: #F2F2F2;
  background-color: #1B1E28;
  position: absolute;
  top: calc(10% - 150px);
  left: -5%;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  box-shadow:
    inset 0 0px 50px #fff,
    inset 20px 0px 80px #BADCEE,
    inset -20px 0px 80px #1B1E28,
    inset 20px 0px 300px #BADCEE,
    inset -20px 0px 300px #1B1E28,
    0 0 100px #fff,
    -10px 0 80px #BADCEE,
    10px 0 80px #1B1E28;
`;


export function Index() {
  const { account } = useWeb3React();
  // const hasTried = useEagerConnect();

  return (
    <Root>
      <HeaderSection>
        <HeaderIllustration>
          <Moon />
        </HeaderIllustration>
        <TypedTextWrapper>
          <Typewriter typedText={'This is MOONLIT. On the left, imagine seeing a nice logo or animated illustration :)'} />
        </TypedTextWrapper>
      </HeaderSection>
      <ProjectSection />
    </Root>
  );
}

export default Index;