import React from 'react'
import styled from 'styled-components'
import { useFetchTopProjects } from '../state/projects/hooks';
import { BASE_BORDER_RADIUS, BASE_BOX_SHADOW } from '../themes'
import Loading from './Loading';
import { ProjectItem } from './ProjectItem'

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
  
  @media (max-width: 900px) {
    margin-block-start: 1rem;
  }
`;

const ProjectList = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 3rem;
`;

const ProjectSection = () => {
  const { loading, error, data } = useFetchTopProjects();
  return (
    <>
      <SectionTitleWrapper>
        <SectionTitle>TOP PROJECTS</SectionTitle>
      </SectionTitleWrapper>
      {loading && !data && <Loading height={530} />}
      <ProjectList>
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