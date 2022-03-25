import React from 'react'
import styled from 'styled-components'
import { SectionTitleWrapper, SectionTitle, ProjectList } from '../components/ProjectSection'
import { ProjectHeader, ProjectItem } from '../components/ProjectItem'
import { useFetchAllProject } from '../state/projects/hooks'
import { BASE_BORDER_RADIUS, BASE_BOX_SHADOW, BG_NORMAL } from '../themes'

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled.input`
  font-family: 'Roboto Mono Bold';
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 1rem;
  background-color: ${BG_NORMAL};
`;

const Projects = () => {
  const { loading, error, data, refetch } = useFetchAllProject();
  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>PROJECTS</SectionTitle>
      </SectionTitleWrapper>
      <ProjectList>
        
        <SearchInput />
        <ProjectHeader
          title={'Title'}
          author={'Author'}
          mintPrice={'Mint Price (MATIC)'}
          fundedAmount={'Funded Amount'}
        />
        {data?.daos.map(({ title, author, address }, idx) => (
          <ProjectItem
            key={idx}
            address={address}
            title={title}
            author={author}
            mintPrice={'25'}
            fundedAmount={15}
          />
        ))}
      </ProjectList>
    </Root>
  );
}

export default Projects