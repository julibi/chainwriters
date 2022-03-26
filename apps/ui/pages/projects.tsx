import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { SectionTitleWrapper, SectionTitle } from '../components/ProjectSection'
import { ProjectItem } from '../components/ProjectItem'
import { useFetchAllProject } from '../state/projects/hooks'
import Dropdown from '../components/Dropdown'
import { BASE_BORDER_RADIUS, PLAIN_WHITE, BG_NORMAL, INSET_BASE_BOX_SHADOW, BaseButton } from '../themes'

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
`;

const Search = styled.div`
  margin: 1rem 0;
  display: flex;

`;

const SearchButton = styled(BaseButton)`
  padding: 1rem;
  margin-inline-end: 1rem;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  font-family: 'Nunito Sans Bold', sans-serif;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  margin-inline-end: 1rem;
  padding: 1rem;
  width: 350px;
  height: 50px;
  color: ${PLAIN_WHITE};
  background-color: ${BG_NORMAL};
  outline: none;
`;

const ProjectItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 3rem;
`;

// TODO: use grid

const Projects = () => {
  const { loading, error, data, refetch } = useFetchAllProject();

  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>PROJECTS</SectionTitle>
      </SectionTitleWrapper>
      <Content>
        <Filtering>
          <Search>
            <SearchInput />
            <SearchButton>
              <Image src={'/SearchIcon.svg'} height={'16px'} width={'20px'} alt='SearchIcon'/>
            </SearchButton>
          </Search>
          <Dropdown />
        </Filtering>
        <ProjectItems>
          {data?.daos.map(({ title, author, address }, idx) => (
            <>
              <ProjectItem
              key={idx}
              address={address}
              title={title}
              author={author}
              mintPrice={'25'}
              fundedAmount={15}
              />
              {/* <ProjectItem
              key={idx}
              address={address}
              title={title}
              author={author}
              mintPrice={'25'}
              fundedAmount={15}
              /> */}
            </>
            ))}
        </ProjectItems>
      </Content>
    </Root>
  );
}

export default Projects