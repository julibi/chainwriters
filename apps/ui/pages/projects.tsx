import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { SectionTitleWrapper, SectionTitle } from '../components/ProjectSection'
import { ProjectItem } from '../components/ProjectItem'
import { useFetchAllAuctions, useFetchAllProjectsDesc, useFetchAllProjectsOldAsc } from '../state/projects/hooks'
import Dropdown from '../components/Dropdown'
import { BaseButton, BaseInput, Cross, INSET_BASE_BOX_SHADOW } from '../themes'
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

const NoResultsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;

const NoResults = styled.h3`
  display: inline-block;
  font-family: 'Roboto Mono Bold', Serif;
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
  const [daos, setDaos] = useState<Dao[] | null>(null);
  const [searchedDaos, setSearchedDaos] = useState<Dao[] | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const fetchAllDesc = useFetchAllProjectsDesc();
  const fetchAllAsc = useFetchAllProjectsOldAsc();
  const fetchAuctions = useFetchAllAuctions();
  const { data, loading } = fetchAllDesc();

  const search = useCallback((filtered?: Dao[]) => {
    const daoArray = filtered ?? daos;
    if (daoArray && (daoArray.length > 0) && (searchInput.trim().length > 0)) {
      const search = searchInput.trim().toLowerCase();
      const result = daoArray.filter((dao:Dao) => 
        dao.title.toLowerCase().includes(search) ||
        dao.subtitle?.toLowerCase().includes(search) ||
        dao.author.toLowerCase().includes(search)
      );
      setHasSearched(true);
      if (result.length > 0) {
        setSearchedDaos(result);
      }
    }
  }, [daos, searchInput]);

  const reset = () => {
    setSearchInput("");
    setSearchedDaos(null);
    setHasSearched(false);
  };

  useEffect(() => {
    if (data) {
      setDaos(data.daos);
    }
  }, [data]);

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
            <Cross onClick={() => setSearchInput('')} />
            <SearchButton
              // @ts-ignore
              onClick={search}
              disabled={!daos || daos.length < 1 || searchInput.length < 1}
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
              disabled={!searchedDaos && !hasSearched}
            >
              Reset
            </ResetButton>
          </Search>
          <Dropdown
            options={[
              {
                id: 1,
                value: 'Newest first',
                onSelect: () => {
                  const { error, loading, data } = fetchAllDesc();
                  if (!error && !loading) {
                    if ((searchInput.length > 0) && hasSearched) {
                      search(data.daos);
                    } else {
                      setDaos(data.daos);
                    }
                  }
                },
              },
              {
                id: 2,
                value: 'Oldest first',
                onSelect: () => {
                  const { error, loading, data } = fetchAllAsc();
                  if (!error && !loading) {
                    if ((searchInput.length > 0) && hasSearched) {
                      search(data.daos);
                    } else {
                      setDaos(data.daos);
                    }
                  }
                },
              },
              {
                id: 3,
                value: 'Auctions only',
                onSelect: () => {
                  const { error, loading, data } = fetchAuctions();
                  if (!error && !loading) {
                    if ((searchInput.length > 0) && hasSearched) {
                      search(data.daos);
                    } else {
                      setDaos(data.daos);
                    }
                  }
                },
              },
            ]}
          />
        </Filtering>
        {loading && !daos && <Loading height={530} />}
        <ProjectItems>
          {hasSearched && !searchedDaos && (
            <NoResultsWrapper>
              <NoResults>No results</NoResults>
            </NoResultsWrapper>
          )}
          {hasSearched &&
            searchedDaos &&
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
          {!hasSearched &&
            !searchedDaos &&
            daos &&
            daos.map(
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