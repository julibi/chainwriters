import React from 'react'
import styled from 'styled-components'
import { useFetchTopProjects } from '../state/projects/hooks';
import { BASE_BORDER_RADIUS, BASE_BOX_SHADOW } from '../themes'
import { ProjectItem, ProjectHeader } from './ProjectItem'

export const SectionTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-family: 'Roboto Mono Bold';
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 1rem;
`;

export const ProjectList = styled.section`
  display: flex;
  flex-direction: column;
  padding: 3rem;
`;

const ProjectSection = () => {
  const { loading, error, data } = useFetchTopProjects();
  return (
    <>
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
    </>
  );
}

export default ProjectSection