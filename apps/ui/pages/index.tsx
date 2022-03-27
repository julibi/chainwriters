import { useEffect } from 'react'
import { toast } from 'react-toastify'
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

const Moon = styled.div`
  background-color: #1B1E28;
  position: absolute;
  top: calc(10% - 150px);
  left: -10%;
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


  @media (max-width: 900px) {
    width: 300px;
    height: 300px;

    top: calc(-25%);
    left: -30%;
  }
`;


export function Index() {
  const { account } = useWeb3React();
  const isMobile = useDeviceDetect();
  // const hasTried = useEagerConnect();

  return (
    <Root>
      <HeaderSection>
        <Moon />
        {!isMobile && <Blocker />}
        <TypedTextWrapper>
          <Typewriter typedText={'This is MOONLIT. On the left, imagine seeing a nice logo or animated illustration :)'} />
        </TypedTextWrapper>
      </HeaderSection>
      <ProjectSection />
    </Root>
  );
}

export default Index;