import React, { useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { SectionTitleWrapper, SectionTitle, ProjectList } from '../components/ProjectSection'
import { ProjectHeader, ProjectItem } from '../components/ProjectItem'
import { useFetchAllProject } from '../state/projects/hooks'
import { BASE_BORDER_RADIUS, PLAIN_WHITE, BG_NORMAL, INSET_BASE_BOX_SHADOW, BaseButton, BASE_BOX_SHADOW } from '../themes'

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Search = styled.div`
  font-family: 'Roboto Mono Bold', serif;
  margin: 1rem 0;
  display: flex;
`;

const SearchButton = styled(BaseButton)`
  padding: 1rem;
  margin-inline-end: 1rem;
`;

const SearchInput = styled.input`
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  margin-inline-end: 1rem;
  padding: 1rem;
  height: 50px;
  color: ${PLAIN_WHITE};
  background-color: ${BG_NORMAL};
`;

const DrowdownOpener = styled(BaseButton)`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  width: 150px;

`;

const ArrowDown = styled.div`
`;

const Options = styled.div`
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  height: 300px;
  width: 100px;
`;

const Projects = () => {
  const { loading, error, data, refetch } = useFetchAllProject();
  const [ showDropdown, setShowDropdown ] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  };

  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>PROJECTS</SectionTitle>
      </SectionTitleWrapper>
      <ProjectList>
        <Search>
          <SearchInput />
          <SearchButton>SEARCH</SearchButton>

          <DrowdownOpener onClick={toggleDropdown}>{`Filter`}
            <ArrowDown>
              <Image height={'16px'} width={'20px'} src={'/ArrowDown.svg'} alt={'ArrowDown'} />
            </ArrowDown>
          </DrowdownOpener>
          {showDropdown && <Options></Options>}
        </Search>
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