import React from 'react';
import styled from 'styled-components';
import { useProjects } from '../../hooks/projects';
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
  padding: 3rem;
`;

const ProjectSection = () => {
  const { topProjects: data, areTopProjectsLoading: loading } = useProjects();
  return (
    <>
      <SectionTitleWrapper>
        <SectionTitle>Top Projects</SectionTitle>
      </SectionTitleWrapper>
      {loading && !data && <Loading height={530} />}
      <ProjectList>
        {data?.map(
          ({ id, title, creator, imgIpfsHash, subtitle, genre }, idx) => (
            <ProjectItem
              key={idx}
              id={id}
              creator={creator}
              title={title}
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
