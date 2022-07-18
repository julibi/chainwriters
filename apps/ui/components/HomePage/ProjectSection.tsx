import React from 'react';
import styled from 'styled-components';
import { useFetchTopProjects } from '../../state/projects/hooks';
import { INTER_BLACK } from '../../themes';
import Loading from '../Loading';
import { ProjectItem } from '../ProjectItem';

export const SectionTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const SectionTitle = styled.h1`
  text-align: center;
  font-family: ${INTER_BLACK};
  font-size: 54px;
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
  padding: 3rem 3rem 6rem 3rem;

  @media (max-width: 900px) {
    padding: 3rem;
  }
`;

const ProjectSection = () => {
  const { loading, error, data } = useFetchTopProjects();
  return (
    <>
      <SectionTitleWrapper>
        <SectionTitle>Top Projects</SectionTitle>
        <span>(These projects are mockups)</span>
      </SectionTitleWrapper>
      {loading && !data && <Loading height={530} />}
      <ProjectList>
        {data?.daos.map(
          (
            { id, title, author, address, imgIpfsHash, subtitle, genre },
            idx
          ) => (
            <ProjectItem
              key={idx}
              id={id}
              address={address}
              title={title}
              author={author}
              imgIpfsHash={imgIpfsHash}
              subtitle={subtitle}
              genre={genre}
            />
          )
        )}
      </ProjectList>
    </>
  );
};

export default ProjectSection;
