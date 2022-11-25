import React from 'react';
import styled from 'styled-components';
import { useProjects } from '../../hooks/projects';
import { FONT_SERIF_BLACK, POP } from '../../themes';
import Loading from '../Loading';
import { ProjectItem } from '../ProjectItem';
import Title from '../Title';

const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SectionTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const SectionTitle = styled.h1`
  text-align: center;
  font-family: ${FONT_SERIF_BLACK};
  color: ${POP};
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
  const { topProjects: data, areTopProjectsLoading: loading } = useProjects();
  return (
    <Root>
      <Title color={POP}>Top Projects</Title>
      {loading && !data && <Loading height={530} />}
      <ProjectList>
        {data?.map(
          (
            { id, title, createdAt, creator, imgIpfsHash, subtitle, genre },
            idx
          ) => (
            <ProjectItem
              key={idx}
              id={id}
              createdAt={createdAt}
              creator={creator}
              title={title}
              imgIpfsHash={imgIpfsHash}
              subtitle={subtitle}
              genre={genre}
            />
          )
        )}
      </ProjectList>
    </Root>
  );
};

export default ProjectSection;
