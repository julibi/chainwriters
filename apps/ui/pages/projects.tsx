import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { SectionTitleWrapper, SectionTitle } from '../components/ProjectSection'
import { ProjectItem } from '../components/ProjectItem'
import { useFetchAllProjects } from '../state/projects/hooks'
import Dropdown from '../components/Dropdown'
import { BaseButton, BaseInput } from '../themes'
import Loading from '../components/Loading';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 3rem;
`;

const Filtering = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0;   
    margin: 0 0 1rem 1rem;
  }
`;

const Search = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
`;

const SearchButton = styled(BaseButton)`
  padding: 1rem;
  margin-inline: 3rem 1rem;
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    margin: 0;
    margin-inline-start: 3rem;
  }
`;

const SearchInput = styled(BaseInput)`
  margin-inline-end: 1rem;
  padding: 1rem;
  width: 350px;
  height: 50px;

  @media (max-width: 900px) {
    width: 200px;
  }
`;

const Cross = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  opacity: 0.3;
  margin-left: -60px;

  :hover {
    opacity: 1;
    cursor: pointer;
  }
  :before,
  :after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 20px;
    width: 2px;
    background-color: white;
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;

const ProjectItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 3rem;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    padding: 0;

  }
`;

// TODO: use grid ?

const Projects = () => {
  const { loading, error, data, refetch } = useFetchAllProjects();

  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>PROJECTS</SectionTitle>
      </SectionTitleWrapper>
      <Content>
        <Filtering>
          <Search>
            <SearchInput />
            <Cross />
            <SearchButton>
              <Image src={'/SearchIcon.svg'} height={'16px'} width={'20px'} alt='SearchIcon'/>
            </SearchButton>
          </Search>
          <Dropdown />
        </Filtering>
        {loading && !data && <Loading height={530} />}
        <ProjectItems>
          {data?.daos.map(({ title, author, address, genre, subtitle, imgIpfsHash, id }, idx) => (
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
          ))}
        </ProjectItems>
      </Content>
    </Root>
  );
}

export default Projects