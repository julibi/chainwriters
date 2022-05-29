import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { SectionTitleWrapper, SectionTitle } from '../components/ProjectSection'
import { ProjectItem } from '../components/ProjectItem'
import { useFetchAllProjects } from '../state/projects/hooks'
import Dropdown from '../components/Dropdown'
import { BaseButton, BaseInput, INSET_BASE_BOX_SHADOW } from '../themes'
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
  flex-wrap: wrap;
`;

interface ButtonProps {
  disabled: boolean;
}

const SearchButton = styled(BaseButton)<ButtonProps>`
  display: flex;
  align-items: center;
  margin-inline-start: 2.5rem;
  padding: 1rem;

  :disabled {
    pointer-events: none;
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }

  @media (max-width: 900px) {
    margin-inline-start: 3rem;
  }
`;

const ResetButton = styled(BaseButton)`
  display: flex;
  align-items: center;
  margin-inline-start: 1rem;
  padding: 1rem;

  :disabled {
    pointer-events: none;
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }

  @media (max-width: 900px) {
    margin-inline-start: 0;
    margin-block-start: 1rem;
  }
`;

const SearchInput = styled(BaseInput)`
  display: inline-block;
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

interface Dao {
  id: string;
  author: string;
  address: string;
  createdAt: string;
  title: string;
  imgIpfsHash?: string;
  subtitle?: string;
  genre?: string;
  auctionsStarted: boolean;
  auctionsEnded: boolean;
}

const Projects = () => {
  const [searchedDaos, setSearchedDaos] = useState<Dao[] | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const { loading, error, data, refetch } = useFetchAllProjects();


  const search = useCallback(() => {
    if (data && (data?.daos.length > 0) && (searchInput.trim().length > 0)) {
      const search = searchInput.toLowerCase();
      const result = data.daos.filter((dao:Dao) => 
        dao.title.toLowerCase().includes(search) ||
        dao.subtitle?.toLowerCase().includes(search) ||
        dao.author.toLowerCase().includes(search)
      );
      if (result.length > 0) {
        setSearchedDaos(result);
      }
    }
  }, [data, searchInput]);

  const reset = useCallback(() => {
    setSearchInput("");
    setSearchedDaos(null);
  }, []);

  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>PROJECTS</SectionTitle>
      </SectionTitleWrapper>
      <Content>
        <Filtering>
          <Search>
            <SearchInput
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  search();
                }
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const input = e.target.value;
                setSearchInput(input);
              }}
              value={searchInput}
            />
            <Cross onClick={() => setSearchInput("")} />
            <SearchButton
              onClick={search}
              disabled={!data || data.length < 1 || searchInput.length < 1}
            >
              <Image
                src={'/SearchIcon.svg'}
                height={'16px'}
                width={'20px'}
                alt="SearchIcon"
              />
            </SearchButton>
            <ResetButton
              onClick={reset}
              disabled={!searchedDaos}
            >
              Reset
            </ResetButton>
          </Search>
          <Dropdown />
        </Filtering>
        {loading && !data && <Loading height={530} />}
        <ProjectItems>
          {searchedDaos &&
            searchedDaos.map(
              (
                { title, author, address, genre, subtitle, imgIpfsHash, id },
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
          {!searchedDaos &&
            data?.daos.map(
              (
                { title, author, address, genre, subtitle, imgIpfsHash, id },
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
        </ProjectItems>
      </Content>
    </Root>
  );
}

export default Projects