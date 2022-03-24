import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { ProjectItem, ProjectHeader } from '../components/ProjectItem'
import Typewriter from '../components/Typewriter'
import { BASE_BORDER_RADIUS, BASE_BOX_SHADOW } from '../themes'
import { useFetchTopProject } from '../state/projects/hooks'

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

const SectionTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-family: 'Roboto Mono Bold';
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 1rem;
`;

const ProjectList = styled.section`
  display: flex;
  flex-direction: column;
  padding: 3rem;
`;

const mockProjects = [
  {
    id: 1,
    title: "My little phony",
    author: "0xc5F490B1629f6D6580F33bF53CEe23eF52cEF89C",
    mintPrice: '25',
    fundedAmount: 25 
  },
  {
    id: 2,
    title: "Die Leiden des Jungen Wärters",
    author: "0x3269a7ebE0FAEdDB5028C90Be247e2d39d5C72c5",
    mintPrice: '72',
    fundedAmount: 5 
  },
  {
    id: 3,
    title: "Middle-Ex",
    author: "0x3269a7ebE0FAEdDB5028C90Be247e2d39d5C72c5",
    mintPrice: '50',
    fundedAmount: 252 
  },
  {
    id: 4,
    title: "Eat Pray Judge",
    author: "0xF41eec0A18747d0E0737Fba72F6C70B6c3d1FB83",
    mintPrice: '100',
    fundedAmount: 53 
  }
];

export function Index() {
  const { account } = useWeb3React();
  // const hasTried = useEagerConnect();
  const { loading, error, data  } = useFetchTopProject();
  console.log({ loading, error, data })

  return (
    <Root>
      <HeaderSection>
        <HeaderIllustration />
        <TypedTextWrapper>
          <Typewriter typedText={'This is MOONLIT. On the left, imagine seeing a nice logo or animated illustration :)'} />
        </TypedTextWrapper>
      </HeaderSection>
      <SectionTitleWrapper>
        <SectionTitle>TOP PROJECTS</SectionTitle>
      </SectionTitleWrapper>
      <ProjectList>
        <ProjectHeader
          title={'Title'}
          author={'Author'}
          mintPrice={'Mint Price (MATIC)'}
          fundedAmount={'Funded Amount'}
        />
        {mockProjects.map(({title, author, mintPrice, fundedAmount}, idx) =>
          <ProjectItem
            key={idx}
            title={title}
            author={author}
            mintPrice={mintPrice}
            fundedAmount={fundedAmount}
          />
        )}
        

      </ProjectList>
    </Root>
  );
}

export default Index;